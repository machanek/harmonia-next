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
  const payload = await getPayloadClient() as any
  
  return payload.requestHandler({
    req,
    res,
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
