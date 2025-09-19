import { NextRequest } from 'next/server'

// Wymuś odświeżenie cache dla debugowania
(global as any).payload = null

let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null }
}

async function getPayloadClient() {
  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    try {
      // Dynamic import dla ES Module
      const payloadModule = await import('payload')
      const configModule = await import('../../payload.config')
      
      console.log('Payload module loaded:', !!payloadModule.getPayload)
      console.log('Config module loaded:', !!configModule.default)
      
      // Użyj oryginalnej konfiguracji z payload.config.ts
      const config = await configModule.default
      
      console.log('Config created:', !!config)
      console.log('Config secret exists:', !!config.secret)
      console.log('Config db exists:', !!config.db)
      
      cached.promise = payloadModule.getPayload({ config })
    } catch (importError) {
      console.error('Import error:', importError)
      throw new Error(`Failed to import Payload modules: ${importError instanceof Error ? importError.message : 'Unknown import error'}`)
    }
  }

  try {
    cached.client = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.client
}

export default async function handler(req: NextRequest) {
  try {
    console.log('=== PAYLOAD CMS DEBUG START ===')
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
      return new Response(JSON.stringify({ error: 'DATABASE_URI not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    if (!process.env.PAYLOAD_SECRET) {
      console.error('PAYLOAD_SECRET not configured')
      return new Response(JSON.stringify({ error: 'PAYLOAD_SECRET not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('Attempting to get Payload client...')
    const payload = await getPayloadClient()
    console.log('Payload client obtained:', !!payload)
    
    console.log('Attempting to call requestHandler...')
    return payload.requestHandler({
      req,
      res: {
        status: (code: number) => ({
          json: (data: any) => ({
            statusCode: code,
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          }),
          send: (data: any) => ({
            statusCode: code,
            body: data,
          }),
          end: () => ({
            statusCode: code,
            body: '',
          }),
        }),
        json: (data: any) => ({
          statusCode: 200,
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }),
        send: (data: any) => ({
          statusCode: 200,
          body: data,
        }),
        end: () => ({
          statusCode: 200,
          body: '',
        }),
      },
    })
  } catch (error) {
    console.error('=== PAYLOAD CMS ERROR ===')
    console.error('Error type:', typeof error)
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    console.error('Full error object:', error)
    
    return new Response(JSON.stringify({ 
      error: 'Payload CMS initialization failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
