import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('=== DATABASE CONNECTION TEST ===')
    
    // Sprawdź zmienne środowiskowe
    console.log('Environment variables:')
    console.log('- NODE_ENV:', process.env.NODE_ENV)
    console.log('- DATABASE_URI exists:', !!process.env.DATABASE_URI)
    console.log('- DATABASE_URI length:', process.env.DATABASE_URI?.length || 0)
    console.log('- SUPABASE_URL exists:', !!process.env.SUPABASE_URL)
    console.log('- SUPABASE_ANON_KEY exists:', !!process.env.SUPABASE_ANON_KEY)
    
    // Sprawdź format DATABASE_URI
    let databaseUri = process.env.DATABASE_URI
    
    if (!databaseUri && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      console.log('Constructing DATABASE_URI from Supabase...')
      try {
        const supabaseUrl = new URL(process.env.SUPABASE_URL)
        databaseUri = `postgresql://postgres:${process.env.SUPABASE_ANON_KEY}@${supabaseUrl.hostname}:5432/postgres`
        console.log('Constructed DATABASE_URI')
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
    console.error('Test connection error:', error)
    return res.status(500).json({ 
      error: 'Test connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
