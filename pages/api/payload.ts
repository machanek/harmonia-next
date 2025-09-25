import { NextApiRequest, NextApiResponse } from 'next'
import { getPayload } from 'payload'
import config from '../../payload.config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Sprawdź czy to żądanie do panelu admin
    if (req.url === '/api/payload' && req.method === 'GET') {
      // Przekieruj do panelu admin
      return res.redirect(302, '/admin')
    }
    
    // Dla innych żądań API, zwróć informacje o Payload CMS
    return res.status(200).json({
      message: 'Payload CMS API',
      version: '3.x',
      collections: ['users', 'media', 'units', 'contact-messages', 'site-settings'],
      endpoints: {
        graphql: '/api/payload/graphql',
        rest: '/api/payload/*',
        admin: '/admin'
      }
    })
  } catch (error) {
    console.error('Payload CMS API error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
