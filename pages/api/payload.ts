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
      console.log('Config type:', typeof config)
      console.log('Config keys:', Object.keys(config || {}))
      console.log('Config secret exists:', !!config.secret)
      console.log('Config db exists:', !!config.db)
      console.log('Config collections count:', config.collections?.length || 0)
      console.log('Config admin exists:', !!config.admin)
      console.log('Config editor exists:', !!config.editor)
      
      // Sprawdź czy config ma wszystkie wymagane pola
      console.log('Config structure check:')
      console.log('- secret type:', typeof config.secret)
      console.log('- admin type:', typeof config.admin)
      console.log('- collections type:', typeof config.collections)
      console.log('- db type:', typeof config.db)
      
      console.log('Initializing Payload client...')
      cached.promise = getPayload({ config })
    } catch (configError) {
      console.error('Config loading error:', configError)
      console.error('Config error details:', configError instanceof Error ? configError.stack : 'No stack trace')
      console.error('Config error name:', configError instanceof Error ? configError.name : 'Unknown')
      console.error('Config error message:', configError instanceof Error ? configError.message : 'Unknown error')
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
    console.log('- NODE_ENV:', process.env.NODE_ENV)
    console.log('- DATABASE_URI exists:', !!process.env.DATABASE_URI)
    console.log('- DATABASE_URI length:', process.env.DATABASE_URI?.length || 0)
    console.log('- DATABASE_URI preview:', process.env.DATABASE_URI?.substring(0, 20) + '...')
    console.log('- DATABASE_URI full length:', process.env.DATABASE_URI?.length)
    console.log('- DATABASE_URI starts with postgres:', process.env.DATABASE_URI?.startsWith('postgres'))
    console.log('- DATABASE_URI starts with postgresql:', process.env.DATABASE_URI?.startsWith('postgresql'))
    console.log('- PAYLOAD_SECRET exists:', !!process.env.PAYLOAD_SECRET)
    console.log('- PAYLOAD_SECRET length:', process.env.PAYLOAD_SECRET?.length || 0)
    console.log('- PAYLOAD_PUBLIC_SERVER_URL exists:', !!process.env.PAYLOAD_PUBLIC_SERVER_URL)
    console.log('- SUPABASE_URL exists:', !!process.env.SUPABASE_URL)
    console.log('- SUPABASE_ANON_KEY exists:', !!process.env.SUPABASE_ANON_KEY)
    
    if (!process.env.DATABASE_URI) {
      console.error('DATABASE_URI not configured')
      return res.status(500).json({ error: 'DATABASE_URI not configured' })
    }
    
    // Sprawdź format DATABASE_URI
    try {
      const url = new URL(process.env.DATABASE_URI)
      console.log('DATABASE_URI URL validation:')
      console.log('- protocol:', url.protocol)
      console.log('- hostname:', url.hostname)
      console.log('- port:', url.port)
      console.log('- pathname:', url.pathname)
      console.log('- search params:', url.searchParams.toString())
    } catch (urlError) {
      console.error('DATABASE_URI URL validation failed:', urlError)
      console.error('DATABASE_URI content:', process.env.DATABASE_URI)
      
      // Sprawdź czy może być problem z formatem Supabase
      if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        console.log('SUPABASE_URL exists, trying to construct DATABASE_URI from Supabase...')
        console.log('SUPABASE_URL:', process.env.SUPABASE_URL)
        console.log('SUPABASE_ANON_KEY length:', process.env.SUPABASE_ANON_KEY?.length)
        
        // Spróbuj skonstruować DATABASE_URI z Supabase
        try {
          const supabaseUrl = new URL(process.env.SUPABASE_URL)
          const constructedUri = `postgresql://postgres:${process.env.SUPABASE_ANON_KEY}@${supabaseUrl.hostname}:5432/postgres`
          console.log('Constructed DATABASE_URI:', constructedUri.substring(0, 50) + '...')
          
          // Sprawdź czy skonstruowany URI jest poprawny
          const testUrl = new URL(constructedUri)
          console.log('Constructed URI validation passed')
        } catch (constructError) {
          console.error('Failed to construct DATABASE_URI from Supabase:', constructError)
        }
      }
      
      return res.status(500).json({ error: 'Invalid DATABASE_URI format' })
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
      if (db && typeof (db as { find?: unknown }).find === 'function') {
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
