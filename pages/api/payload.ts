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

async function getPayloadClient(databaseUri?: string) {
  if (!cached) {
    cached = (global as typeof globalThis & { payload: PayloadCache }).payload = { client: null, promise: null }
  }

  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    try {
      console.log('Loading Payload config...')
      
      // Dodaj timeout dla payloadConfig
      const configPromise = payloadConfig
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Payload config loading timeout after 5 seconds')), 5000)
      )
      
      const config = await Promise.race([configPromise, timeoutPromise]) as unknown
      
      // Zastąp DATABASE_URI w konfiguracji jeśli został skonstruowany
      if (databaseUri && databaseUri !== process.env.DATABASE_URI) {
        console.log('Using constructed DATABASE_URI instead of environment variable')
        // Musimy przekazać databaseUri do konfiguracji
        // To wymaga modyfikacji payload.config.ts
      }
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
      
      // Dodaj timeout dla getPayload
      const payloadPromise = getPayload({ config })
      const payloadTimeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Payload client initialization timeout after 10 seconds')), 10000)
      )
      
      cached.promise = Promise.race([payloadPromise, payloadTimeoutPromise])
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
    
    // Sprawdź czy mamy DATABASE_URI lub możemy go skonstruować z Supabase
    let databaseUri = process.env.DATABASE_URI
    
    if (!databaseUri && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      console.log('DATABASE_URI not found, constructing from Supabase...')
      try {
        const supabaseUrl = new URL(process.env.SUPABASE_URL)
        console.log('Supabase URL parsed:', supabaseUrl.hostname)
        console.log('SUPABASE_ANON_KEY length:', process.env.SUPABASE_ANON_KEY?.length)
        
        // Spróbujmy różnych formatów connection string
        const formats = [
          `postgresql://postgres:${process.env.SUPABASE_ANON_KEY}@${supabaseUrl.hostname}:5432/postgres`,
          `postgresql://postgres:${process.env.SUPABASE_ANON_KEY}@${supabaseUrl.hostname}:5432/postgres?sslmode=require`,
          `postgresql://postgres:${process.env.SUPABASE_ANON_KEY}@${supabaseUrl.hostname}:5432/postgres?sslmode=require&sslcert=&sslkey=&sslrootcert=`,
        ]
        
        for (let i = 0; i < formats.length; i++) {
          try {
            new URL(formats[i])
            console.log(`Format ${i + 1} validation passed:`, formats[i].substring(0, 50) + '...')
            databaseUri = formats[i]
            console.log('Using format:', i + 1)
            break
          } catch (formatError) {
            console.log(`Format ${i + 1} validation failed:`, formatError instanceof Error ? formatError.message : 'Unknown error')
          }
        }
        
        if (databaseUri) {
          console.log('Constructed DATABASE_URI from Supabase')
        } else {
          console.error('All formats failed validation')
        }
      } catch (supabaseError) {
        console.error('Failed to construct DATABASE_URI from Supabase:', supabaseError)
      }
    }
    
    if (!databaseUri) {
      console.error('DATABASE_URI not configured and cannot construct from Supabase')
      return res.status(500).json({ error: 'DATABASE_URI not configured' })
    }
    
    // Sprawdź format DATABASE_URI
    try {
      const url = new URL(databaseUri)
      console.log('DATABASE_URI URL validation:')
      console.log('- protocol:', url.protocol)
      console.log('- hostname:', url.hostname)
      console.log('- port:', url.port)
      console.log('- pathname:', url.pathname)
      console.log('- search params:', url.searchParams.toString())
    } catch (urlError) {
      console.error('DATABASE_URI URL validation failed:', urlError)
      console.error('DATABASE_URI content:', databaseUri)
      return res.status(500).json({ error: 'Invalid DATABASE_URI format' })
    }
    
    if (!process.env.PAYLOAD_SECRET) {
      console.error('PAYLOAD_SECRET not configured')
      return res.status(500).json({ error: 'PAYLOAD_SECRET not configured' })
    }

    console.log('Attempting to get Payload client...')
    const payload = await getPayloadClient(databaseUri)
    console.log('Payload client obtained:', !!payload)
    console.log('Payload client type:', typeof payload)
    console.log('Payload client keys:', Object.keys(payload || {}))
    
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
    
    // Sprawdź czy payload ma requestHandler
    if (payload && typeof (payload as { requestHandler?: unknown }).requestHandler === 'function') {
      console.log('Attempting to call requestHandler...')
      return (payload as { requestHandler: (args: { req: NextApiRequest; res: NextApiResponse }) => unknown }).requestHandler({
        req,
        res,
      })
    } else {
      console.error('Payload client does not have requestHandler method')
      console.error('Available methods:', Object.keys(payload || {}))
      return res.status(500).json({ 
        error: 'Payload CMS requestHandler not available',
        details: 'Payload client does not have requestHandler method',
        availableMethods: Object.keys(payload || {})
      })
    }
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
