import { NextApiRequest, NextApiResponse } from 'next'
import { postgresAdapter } from '@payloadcms/db-postgres'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('=== DATABASE CONNECTION TEST ===')
    console.log('DATABASE_URI exists:', !!process.env.DATABASE_URI)
    console.log('DATABASE_URI length:', process.env.DATABASE_URI?.length || 0)
    
    if (!process.env.DATABASE_URI) {
      return res.status(500).json({ error: 'DATABASE_URI not configured' })
    }

    // Test basic connection
    const adapter = postgresAdapter({
      pool: {
        connectionString: process.env.DATABASE_URI,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      },
    })

    console.log('Adapter created:', !!adapter)
    
    // Try to connect
    console.log('Attempting to connect to database...')
    const db = await (adapter as { connect?: () => Promise<unknown> }).connect?.()
    console.log('Database connected:', !!db)
    
    // Try a simple query
    console.log('Testing database query...')
    const result = await (db as { find?: (args: { collection: string; limit: number }) => Promise<unknown> }).find?.({
      collection: 'users',
      limit: 1,
    })
    
    console.log('Query result:', result)
    
    return res.status(200).json({
      success: true,
      message: 'Database connection successful',
      result: result
    })
    
  } catch (error) {
    console.error('Database test failed:', error)
    return res.status(500).json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
  }
}
