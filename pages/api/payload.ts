import { NextApiRequest, NextApiResponse } from 'next'
import { getPayload } from 'payload'
import payloadConfig from '../../payload.config'

interface PayloadCache {
  client: unknown;
  promise: Promise<unknown> | null;
}

let cached = (global as typeof globalThis & { payload?: PayloadCache }).payload

if (!cached) {
  cached = (global as typeof globalThis & { payload: PayloadCache }).payload = { client: null, promise: null }
}

async function getPayloadClient() {
  if (!cached) {
    cached = (global as typeof globalThis & { payload: PayloadCache }).payload = { client: null, promise: null }
  }

  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    try {
      console.log('Loading Payload config...')
      const config = await payloadConfig
      console.log('Config loaded successfully:', !!config)
      console.log('Config secret exists:', !!config.secret)
      console.log('Config db exists:', !!config.db)
      console.log('Config collections count:', config.collections?.length || 0)
      console.log('Config admin exists:', !!config.admin)
      console.log('Config editor exists:', !!config.editor)
      
      console.log('Initializing Payload client...')
      cached.promise = getPayload({ config })
    } catch (configError) {
      console.error('Config loading error:', configError)
      console.error('Config error details:', configError instanceof Error ? configError.stack : 'No stack trace')
      throw new Error(`Failed to load Payload config: ${configError instanceof Error ? configError.message : 'Unknown config error'}`)
    }
  }

  try {
    cached.client = await cached.promise
    console.log('Payload client initialized successfully')
  } catch (e) {
    cached.promise = null
    console.error('Payload client initialization failed:', e)
    throw e
  }

  return cached.client
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('=== PAYLOAD CMS API ROUTE DEBUG ===')
    console.log('Request URL:', req.url)
    console.log('Request method:', req.method)
    
    // Sprawdź zmienne środowiskowe
    console.log('Environment variables check:')
    console.log('- DATABASE_URI exists:', !!process.env.DATABASE_URI)
    console.log('- PAYLOAD_SECRET exists:', !!process.env.PAYLOAD_SECRET)
    console.log('- PAYLOAD_PUBLIC_SERVER_URL exists:', !!process.env.PAYLOAD_PUBLIC_SERVER_URL)
    console.log('- SUPABASE_URL exists:', !!process.env.SUPABASE_URL)
    console.log('- SUPABASE_ANON_KEY exists:', !!process.env.SUPABASE_ANON_KEY)
    
    if (!process.env.DATABASE_URI) {
      console.error('DATABASE_URI not configured')
      return res.status(500).json({ error: 'DATABASE_URI not configured' })
    }
    
    if (!process.env.PAYLOAD_SECRET) {
      console.error('PAYLOAD_SECRET not configured')
      return res.status(500).json({ error: 'PAYLOAD_SECRET not configured' })
    }

    console.log('Attempting to get Payload client...')
    const payload = await getPayloadClient() as { requestHandler: (args: { req: NextApiRequest; res: NextApiResponse }) => unknown }
    console.log('Payload client obtained:', !!payload)
    
    // Test database connection
    try {
      console.log('Testing database connection...')
      const db = (payload as unknown as { db?: unknown }).db
      console.log('Database object exists:', !!db)
      
      // Try to get database info
      if (db && typeof db.find === 'function') {
        console.log('Database find method exists')
      }
    } catch (dbError) {
      console.error('Database connection test failed:', dbError)
    }
    
    console.log('Attempting to call requestHandler...')
    return payload.requestHandler({
      req,
      res,
    })
  } catch (error) {
    console.error('=== PAYLOAD CMS ERROR ===')
    console.error('Error type:', typeof error)
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    console.error('Full error object:', error)
    
    return res.status(500).json({ 
      error: 'Payload CMS initialization failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
