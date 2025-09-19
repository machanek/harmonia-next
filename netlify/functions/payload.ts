import { NextRequest } from 'next/server'

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
      
      const config = configModule.default
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
    // Sprawdź czy zmienne środowiskowe są ustawione
    if (!process.env.DATABASE_URI) {
      return new Response(JSON.stringify({ error: 'DATABASE_URI not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    if (!process.env.PAYLOAD_SECRET) {
      return new Response(JSON.stringify({ error: 'PAYLOAD_SECRET not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const payload = await getPayloadClient()
    
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
    console.error('Payload CMS Error:', error)
    return new Response(JSON.stringify({ 
      error: 'Payload CMS initialization failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
