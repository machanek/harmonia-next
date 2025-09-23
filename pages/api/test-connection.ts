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
    console.log('- SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
    console.log('- SUPABASE_SERVICE_ROLE_KEY length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0)
    console.log('- SUPABASE_DB_PASSWORD exists:', !!process.env.SUPABASE_DB_PASSWORD)
    console.log('- SUPABASE_DB_PASSWORD length:', process.env.SUPABASE_DB_PASSWORD?.length || 0)
    
    // Sprawdź format DATABASE_URI
    let databaseUri = process.env.DATABASE_URI
    
    if (!databaseUri && process.env.SUPABASE_URL) {
      console.log('Constructing DATABASE_URI from Supabase...')
      console.log('SUPABASE_URL:', process.env.SUPABASE_URL)
      try {
        const supabaseUrl = new URL(process.env.SUPABASE_URL)
        console.log('Supabase URL parsed successfully')
        console.log('Supabase hostname:', supabaseUrl.hostname)
        console.log('Supabase protocol:', supabaseUrl.protocol)
        console.log('Supabase port:', supabaseUrl.port)
        
        // Spróbuj różnych kombinacji kluczy i haseł
        const combinations = [
          { key: 'SUPABASE_ANON_KEY', password: process.env.SUPABASE_ANON_KEY },
          { key: 'SUPABASE_SERVICE_ROLE_KEY', password: process.env.SUPABASE_SERVICE_ROLE_KEY },
          { key: 'SUPABASE_DB_PASSWORD', password: process.env.SUPABASE_DB_PASSWORD },
          { key: 'SUPABASE_ANON_KEY (as user)', password: process.env.SUPABASE_ANON_KEY, user: 'postgres' },
          { key: 'SUPABASE_SERVICE_ROLE_KEY (as user)', password: process.env.SUPABASE_SERVICE_ROLE_KEY, user: 'postgres' },
        ]
        
        for (const combo of combinations) {
          console.log(`Testing combination: ${combo.key}`)
          console.log(`Password exists: ${!!combo.password}`)
          console.log(`Password length: ${combo.password?.length || 0}`)
          
          if (combo.password) {
            try {
              const user = combo.user || 'postgres'
              const testUri = `postgresql://${user}:${combo.password}@${supabaseUrl.hostname}:5432/postgres`
              console.log(`Testing ${combo.key}:`, testUri.substring(0, 50) + '...')
              console.log(`Full URI length: ${testUri.length}`)
              
              // Sprawdź format URL
              const parsedUrl = new URL(testUri)
              console.log(`Format validation passed for ${combo.key}`)
              console.log(`Parsed protocol: ${parsedUrl.protocol}`)
              console.log(`Parsed hostname: ${parsedUrl.hostname}`)
              console.log(`Parsed port: ${parsedUrl.port}`)
              console.log(`Parsed pathname: ${parsedUrl.pathname}`)
              
              databaseUri = testUri
              console.log('Using combination:', combo.key)
              break
            } catch (formatError) {
              console.log(`Format validation failed for ${combo.key}:`, formatError instanceof Error ? formatError.message : 'Unknown error')
              console.log(`Error type: ${typeof formatError}`)
              console.log(`Error name: ${formatError instanceof Error ? formatError.name : 'Unknown'}`)
            }
          } else {
            console.log(`Skipping ${combo.key} - no password available`)
          }
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
