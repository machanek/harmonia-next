import { NextApiRequest, NextApiResponse } from 'next'
import { getPayload } from 'payload'
import config from '../../payload.config'

let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null }
}

async function getPayloadClient() {
  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = getPayload({ config })
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
  const payload = await getPayloadClient()
  
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
