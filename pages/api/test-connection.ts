import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('=== DATABASE CONNECTION TEST START ===')
  console.log('Request method:', req.method)
  console.log('Request URL:', req.url)
  
  try {
    
    // Sprawdź zmienne środowiskowe
    console.log('Environment variables:')
    console.log('- NODE_ENV:', process.env.NODE_ENV)
    console.log('- DATABASE_URI exists:', !!process.env.DATABASE_URI)
    console.log('- DATABASE_URI length:', process.env.DATABASE_URI?.length || 0)
    console.log('- DATABASE_URI preview:', process.env.DATABASE_URI?.substring(0, 30) + '...')
    console.log('- SUPABASE_URL exists:', !!process.env.SUPABASE_URL)
    console.log('- SUPABASE_URL value:', process.env.SUPABASE_URL)
    console.log('- SUPABASE_ANON_KEY exists:', !!process.env.SUPABASE_ANON_KEY)
    console.log('- SUPABASE_ANON_KEY length:', process.env.SUPABASE_ANON_KEY?.length || 0)
    console.log('- NEXT_PUBLIC_SUPABASE_URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('- NEXT_PUBLIC_SUPABASE_URL value:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
    console.log('- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY length:', process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.length || 0)
    console.log('- SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
    console.log('- SUPABASE_SERVICE_ROLE_KEY length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0)
    console.log('- SUPABASE_DB_PASSWORD exists:', !!process.env.SUPABASE_DB_PASSWORD)
    console.log('- SUPABASE_DB_PASSWORD length:', process.env.SUPABASE_DB_PASSWORD?.length || 0)
    console.log('- DATABASE_PASSWORD exists:', !!process.env.DATABASE_PASSWORD)
    console.log('- DATABASE_PASSWORD length:', process.env.DATABASE_PASSWORD?.length || 0)
    console.log('- POSTGRES_PASSWORD exists:', !!process.env.POSTGRES_PASSWORD)
    console.log('- POSTGRES_PASSWORD length:', process.env.POSTGRES_PASSWORD?.length || 0)
    
    // Sprawdź format DATABASE_URI
    let databaseUri = process.env.DATABASE_URI
    
    // Jeśli DATABASE_URI istnieje, sprawdź czy ma znaki specjalne w haśle
    if (databaseUri) {
      try {
        new URL(databaseUri)
        console.log('DATABASE_URI format validation passed')
      } catch (urlError) {
        console.log('DATABASE_URI has invalid format, trying to fix...')
        console.log('Original DATABASE_URI:', databaseUri)
        
        // Spróbuj naprawić przez zakodowanie hasła
        try {
          const match = databaseUri.match(/postgresql:\/\/postgres:([^@]+)@(.+)/)
          if (match) {
            const [, password, rest] = match
            const encodedPassword = encodeURIComponent(password)
            const fixedUri = `postgresql://postgres:${encodedPassword}@${rest}`
            console.log('Fixed DATABASE_URI:', fixedUri.substring(0, 50) + '...')
            
            // Sprawdź czy naprawiony URI jest poprawny
            new URL(fixedUri)
            console.log('Fixed DATABASE_URI validation passed')
            databaseUri = fixedUri
          }
        } catch (fixError) {
          console.error('Failed to fix DATABASE_URI:', fixError)
        }
      }
    }
    
    if (!databaseUri && (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)) {
      console.log('Constructing DATABASE_URI from Supabase...')
      const supabaseUrlString = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
      console.log('Using Supabase URL:', supabaseUrlString)
      try {
        const supabaseUrl = new URL(supabaseUrlString!)
        console.log('Supabase URL parsed successfully')
        console.log('Supabase hostname:', supabaseUrl.hostname)
        console.log('Supabase protocol:', supabaseUrl.protocol)
        console.log('Supabase port:', supabaseUrl.port)
        
        // Supabase używa różnych hostname dla różnych typów połączeń
        // Transaction Pooler (dla serverless): aws-1-eu-central-1.pooler.supabase.com
        // Direct connection: db.rrpzjktpdgpmmgmyxywn.supabase.co
        
        // WYMUŚ UŻYCIE TRANSACTION POOLER - idealny dla serverless functions
        const hostnameVariants = [
          'aws-1-eu-central-1.pooler.supabase.com', // Transaction Pooler (serverless) - WYMUSZONY
          'aws-0-eu-central-1.pooler.supabase.com', // Alternatywny pooler
          'aws-1-eu-central-1.pooler.supabase.com', // Duplikat dla pewności
          `db.${supabaseUrl.hostname}`, // Direct connection: db.rrpzjktpdgpmmgmyxywn.supabase.co
          supabaseUrl.hostname, // oryginalny hostname
          `aws-0-${supabaseUrl.hostname}`, // z prefiksem aws-0-
        ]
        
        console.log('FORCING TRANSACTION POOLER USAGE - serverless optimized')
        
        console.log('Testing hostname variants:', hostnameVariants)
        
        // Spróbuj różnych kombinacji kluczy i haseł
        const combinations = [
          { key: 'SUPABASE_DB_PASSWORD', password: process.env.SUPABASE_DB_PASSWORD },
          { key: 'DATABASE_PASSWORD', password: process.env.DATABASE_PASSWORD },
          { key: 'POSTGRES_PASSWORD', password: process.env.POSTGRES_PASSWORD },
          { key: 'HARDCODED_PASSWORD', password: 'vp2TAY$w!EM#4E9f' }, // Hasło z panelu Supabase
          { key: 'SUPABASE_ANON_KEY', password: process.env.SUPABASE_ANON_KEY },
          { key: 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', password: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY },
          { key: 'SUPABASE_SERVICE_ROLE_KEY', password: process.env.SUPABASE_SERVICE_ROLE_KEY },
          { key: 'SUPABASE_DB_PASSWORD (as user)', password: process.env.SUPABASE_DB_PASSWORD, user: 'postgres' },
          { key: 'DATABASE_PASSWORD (as user)', password: process.env.DATABASE_PASSWORD, user: 'postgres' },
          { key: 'POSTGRES_PASSWORD (as user)', password: process.env.POSTGRES_PASSWORD, user: 'postgres' },
          { key: 'HARDCODED_PASSWORD (as user)', password: 'vp2TAY$w!EM#4E9f', user: 'postgres' },
          { key: 'SUPABASE_ANON_KEY (as user)', password: process.env.SUPABASE_ANON_KEY, user: 'postgres' },
          { key: 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (as user)', password: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, user: 'postgres' },
          { key: 'SUPABASE_SERVICE_ROLE_KEY (as user)', password: process.env.SUPABASE_SERVICE_ROLE_KEY, user: 'postgres' },
        ]
        
        // Testuj różne kombinacje hostname, portów, użytkowników i kluczy
        for (const hostname of hostnameVariants) {
          console.log(`Testing hostname: ${hostname}`)
          
          // Różne porty i użytkownicy w zależności od hostname
          const portUserVariants = hostname.includes('pooler') 
            ? [
                { port: 6543, user: 'postgres.rrpzjktpdgpmmgmyxywn' }, // Transaction Pooler (serverless) - PRIORYTET
                { port: 5432, user: 'postgres.rrpzjktpdgpmmgmyxywn' }, // Session Pooler (IPv4)
                { port: 6543, user: 'postgres' },
                { port: 5432, user: 'postgres' },
              ]
            : [
                { port: 5432, user: 'postgres' }, // Direct connection
                { port: 6543, user: 'postgres' },
              ]
          
          console.log(`Port/User variants for ${hostname}:`, portUserVariants)
          
          for (const portUser of portUserVariants) {
            console.log(`Testing port: ${portUser.port}, user: ${portUser.user}`)
            
            for (const combo of combinations) {
              console.log(`Testing combination: ${combo.key} with hostname: ${hostname}, port: ${portUser.port}, user: ${portUser.user}`)
              console.log(`Password exists: ${!!combo.password}`)
              console.log(`Password length: ${combo.password?.length || 0}`)
              
              if (combo.password) {
                try {
                  const user = combo.user || portUser.user
                  const testUri = `postgresql://${user}:${combo.password}@${hostname}:${portUser.port}/postgres`
                  console.log(`Testing ${combo.key}:`, testUri.substring(0, 50) + '...')
                  console.log(`Full URI length: ${testUri.length}`)
                  
                  // Sprawdź format URL
                  const parsedUrl = new URL(testUri)
                  console.log(`Format validation passed for ${combo.key} with ${hostname}:${portUser.port}`)
                  console.log(`Parsed protocol: ${parsedUrl.protocol}`)
                  console.log(`Parsed hostname: ${parsedUrl.hostname}`)
                  console.log(`Parsed port: ${parsedUrl.port}`)
                  console.log(`Parsed pathname: ${parsedUrl.pathname}`)
                  
                  databaseUri = testUri
                  console.log('Using combination:', combo.key, 'with hostname:', hostname, 'port:', portUser.port, 'user:', user)
                  break
                } catch (formatError) {
                  console.log(`Format validation failed for ${combo.key} with ${hostname}:${portUser.port}:`, formatError instanceof Error ? formatError.message : 'Unknown error')
                  console.log(`Error type: ${typeof formatError}`)
                  console.log(`Error name: ${formatError instanceof Error ? formatError.name : 'Unknown'}`)
                }
              } else {
                console.log(`Skipping ${combo.key} - no password available`)
              }
            }
            
            if (databaseUri) break
          }
          
          if (databaseUri) break
        }
        
        if (!databaseUri) {
          console.error('All combinations failed')
          return res.status(500).json({ error: 'Failed to construct valid DATABASE_URI from Supabase' })
        }
        
        console.log('Constructed DATABASE_URI successfully')
      } catch (error) {
        console.error('Failed to construct DATABASE_URI:', error)
        return res.status(500).json({ error: 'Failed to construct DATABASE_URI' })
      }
    }
    
    if (!databaseUri) {
      return res.status(500).json({ error: 'No DATABASE_URI available' })
    }
    
    // Sprawdź format URL
    try {
      const url = new URL(databaseUri)
      console.log('DATABASE_URI format validation:')
      console.log('- protocol:', url.protocol)
      console.log('- hostname:', url.hostname)
      console.log('- port:', url.port)
      console.log('- pathname:', url.pathname)
    } catch (urlError) {
      console.error('DATABASE_URI format error:', urlError)
      return res.status(500).json({ error: 'Invalid DATABASE_URI format' })
    }
    
    // Test podstawowego połączenia z PostgreSQL
    try {
      console.log('Testing PostgreSQL connection...')
      const { Client } = await import('pg')
      
      const client = new Client({
        connectionString: databaseUri,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      })
      
      await client.connect()
      console.log('PostgreSQL connection successful!')
      
      // Test podstawowego zapytania
      const result = await client.query('SELECT version()')
      console.log('PostgreSQL version:', result.rows[0]?.version?.substring(0, 50))
      
      // Test czy tabele Payload CMS istnieją
      const tablesResult = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name LIKE '%payload%'
      `)
      console.log('Payload CMS tables found:', tablesResult.rows.length)
      console.log('Tables:', tablesResult.rows.map(row => row.table_name))
      
      await client.end()
      
      return res.status(200).json({
        success: true,
        message: 'Database connection successful',
        details: {
          version: result.rows[0]?.version?.substring(0, 50),
          payloadTables: tablesResult.rows.length,
          tables: tablesResult.rows.map(row => row.table_name)
        }
      })
      
    } catch (dbError) {
      console.error('Database connection failed:', dbError)
      return res.status(500).json({ 
        error: 'Database connection failed',
        details: dbError instanceof Error ? dbError.message : 'Unknown error'
      })
    }
    
  } catch (error) {
    console.error('=== DATABASE CONNECTION TEST ERROR ===')
    console.error('Error type:', typeof error)
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    console.error('Full error object:', error)
    
    return res.status(500).json({ 
      error: 'Test connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
  
  console.log('=== DATABASE CONNECTION TEST END ===')
}
