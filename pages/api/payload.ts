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
    cached.promise = getPayload({ config: payloadConfig })
  }

  try {
    cached.client = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.client
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Sprawdź czy zmienne środowiskowe są ustawione
    if (!process.env.DATABASE_URI) {
      return res.status(500).json({ error: 'DATABASE_URI not configured' })
    }
    
    if (!process.env.PAYLOAD_SECRET) {
      return res.status(500).json({ error: 'PAYLOAD_SECRET not configured' })
    }

    const payload = await getPayloadClient() as { requestHandler: (args: { req: NextApiRequest; res: NextApiResponse }) => unknown }
    
    return payload.requestHandler({
      req,
      res,
    })
  } catch (error) {
    console.error('Payload CMS Error:', error)
    return res.status(500).json({ 
      error: 'Payload CMS initialization failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
