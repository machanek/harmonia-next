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
      
      // Dodaj timeout dla payloadConfig - skróć do 3 sekund
      const configPromise = payloadConfig
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Payload config loading timeout after 3 seconds')), 3000)
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
      console.log('Config secret exists:', !!(config as unknown as { secret?: unknown }).secret)
      console.log('Config db exists:', !!(config as unknown as { db?: unknown }).db)
      console.log('Config collections count:', (config as unknown as { collections?: unknown[] }).collections?.length || 0)
      console.log('Config admin exists:', !!(config as unknown as { admin?: unknown }).admin)
      console.log('Config editor exists:', !!(config as unknown as { editor?: unknown }).editor)
      
      // Sprawdź czy config ma wszystkie wymagane pola
      console.log('Config structure check:')
      console.log('- secret type:', typeof (config as unknown as { secret?: unknown }).secret)
      console.log('- admin type:', typeof (config as unknown as { admin?: unknown }).admin)
      console.log('- collections type:', typeof (config as unknown as { collections?: unknown }).collections)
      console.log('- db type:', typeof (config as unknown as { db?: unknown }).db)
      
      console.log('Initializing Payload client...')
      
      // Dodaj timeout dla getPayload - skróć do 5 sekund
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payloadPromise = getPayload({ config: config as any })
      const payloadTimeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Payload client initialization timeout after 5 seconds')), 5000)
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
    
    // Dodaj timeout dla całego procesu inicjalizacji
    const clientPromise = getPayloadClient(databaseUri)
    const clientTimeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Payload client initialization timeout after 8 seconds')), 8000)
    )
    
    const payload = await Promise.race([clientPromise, clientTimeoutPromise])
    console.log('Payload client obtained:', !!payload)
    console.log('Payload client type:', typeof payload)
    console.log('Payload client keys:', Object.keys(payload || {}))
    
    // Sprawdź dostępne metody Payload CMS
    if (payload) {
      console.log('Payload CMS methods:')
      console.log('- requestHandler:', typeof (payload as { requestHandler?: unknown }).requestHandler)
      console.log('- getAdminURL:', typeof (payload as { getAdminURL?: unknown }).getAdminURL)
      console.log('- renderAdmin:', typeof (payload as { renderAdmin?: unknown }).renderAdmin)
      console.log('- getAdminHTML:', typeof (payload as { getAdminHTML?: unknown }).getAdminHTML)
      console.log('- admin:', typeof (payload as { admin?: unknown }).admin)
      console.log('- config:', typeof (payload as { config?: unknown }).config)
    }
    
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
    
          // Sprawdź czy payload ma requestHandler (Payload CMS 2.x) lub getAdminURL (Payload CMS 3.x)
          if (payload && typeof (payload as { requestHandler?: unknown }).requestHandler === 'function') {
            console.log('Attempting to call requestHandler (Payload CMS 2.x)...')
            return (payload as { requestHandler: (args: { req: NextApiRequest; res: NextApiResponse }) => unknown }).requestHandler({
              req,
              res,
            })
          } else if (payload && typeof (payload as { getAdminURL?: unknown }).getAdminURL === 'function') {
            console.log('Using Payload CMS 3.x - getting admin URL...')
            const adminURL = (payload as { getAdminURL: () => string }).getAdminURL()
            console.log('Admin URL:', adminURL)
            
            // Sprawdź czy adminURL nie prowadzi do /admin (co spowodowałoby pętlę)
            // Tymczasowo wyłącz sprawdzanie, aby zobaczyć co zwraca Payload CMS
            console.log('Admin URL check:', adminURL, 'contains /admin:', adminURL?.includes('/admin'))
            if (false && adminURL && adminURL.includes('/admin')) {
              console.log('Admin URL contains /admin, avoiding redirect loop')
              // Zamiast zwracać JSON, spróbujmy użyć requestHandler z Payload CMS 3.x
              if (payload && typeof (payload as { requestHandler?: unknown }).requestHandler === 'function') {
                console.log('Using requestHandler from Payload CMS 3.x...')
                return (payload as { requestHandler: (args: { req: NextApiRequest; res: NextApiResponse }) => unknown }).requestHandler({
                  req,
                  res,
                })
              } else {
                // Jeśli nie ma requestHandler, spróbujmy zwrócić prawdziwy interfejs Payload CMS
                console.log('No requestHandler available, trying to return Payload CMS interface...')
                console.log('Admin URL for interface:', adminURL)
                
                // Spróbujmy zwrócić prawdziwy interfejs Payload CMS zamiast fallback HTML
                try {
                  // Sprawdź czy payload ma inne metody do renderowania interfejsu
                  if (payload && typeof (payload as { renderAdmin?: unknown }).renderAdmin === 'function') {
                    console.log('Using renderAdmin method...')
                    return (payload as { renderAdmin: (args: { req: NextApiRequest; res: NextApiResponse }) => unknown }).renderAdmin({
                      req,
                      res,
                    })
                  } else if (payload && typeof (payload as { getAdminHTML?: unknown }).getAdminHTML === 'function') {
                    console.log('Using getAdminHTML method...')
                    const html = (payload as { getAdminHTML: () => string }).getAdminHTML()
                    res.setHeader('Content-Type', 'text/html')
                    return res.status(200).send(html)
                  } else {
                    console.log('No admin interface methods available, returning fallback HTML...')
                    const html = `
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <title>Payload CMS Admin</title>
                          <meta charset="utf-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                        </head>
                        <body>
                          <div id="payload-admin">
                            <h1>Payload CMS 3.x Admin Panel</h1>
                            <p>Admin URL: ${adminURL}</p>
                            <p>Note: This is a fallback interface. The full admin panel should be available at the admin URL.</p>
                        <script>
                          // Usuń przekierowanie, aby uniknąć pętli
                          console.log('Payload CMS 3.x Admin Panel loaded');
                        </script>
                          </div>
                        </body>
                      </html>
                    `
                    console.log('Setting Content-Type to text/html')
                    res.setHeader('Content-Type', 'text/html')
                    console.log('Sending HTML response')
                    return res.status(200).send(html)
                  }
                } catch (interfaceError) {
                  console.error('Error rendering admin interface:', interfaceError)
                  // Fallback do HTML
                  const html = `
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <title>Payload CMS Admin</title>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                      </head>
                      <body>
                        <div id="payload-admin">
                          <h1>Payload CMS 3.x Admin Panel</h1>
                          <p>Admin URL: ${adminURL}</p>
                          <p>Note: This is a fallback interface. The full admin panel should be available at the admin URL.</p>
                        <script>
                          // Usuń przekierowanie, aby uniknąć pętli
                          console.log('Payload CMS 3.x Admin Panel loaded');
                        </script>
                        </div>
                      </body>
                    </html>
                  `
                  res.setHeader('Content-Type', 'text/html')
                  return res.status(200).send(html)
                }
              }
            }
            
            console.log('Admin URL:', adminURL)
            
            // Sprawdź czy adminURL to /admin (co spowodowałoby pętlę)
            if (adminURL === '/admin' || adminURL?.includes('/admin')) {
              console.log('Admin URL is /admin, avoiding redirect loop - trying to use requestHandler')
              
              // Spróbujmy użyć requestHandler z Payload CMS 3.x
              if (payload && typeof (payload as { requestHandler?: unknown }).requestHandler === 'function') {
                console.log('Using requestHandler from Payload CMS 3.x...')
                return (payload as { requestHandler: (args: { req: NextApiRequest; res: NextApiResponse }) => unknown }).requestHandler({
                  req,
                  res,
                })
              } else {
                console.log('No requestHandler available, trying other methods...')
                
                // Spróbujmy innych metod Payload CMS 3.x
                if (payload && typeof (payload as { renderAdmin?: unknown }).renderAdmin === 'function') {
                  console.log('Using renderAdmin method...')
                  return (payload as { renderAdmin: (args: { req: NextApiRequest; res: NextApiResponse }) => unknown }).renderAdmin({
                    req,
                    res,
                  })
                } else if (payload && typeof (payload as { getAdminHTML?: unknown }).getAdminHTML === 'function') {
                  console.log('Using getAdminHTML method...')
                  const html = (payload as { getAdminHTML: () => string }).getAdminHTML()
                  res.setHeader('Content-Type', 'text/html')
                  return res.status(200).send(html)
                } else {
                  console.log('No admin interface methods available, returning fallback HTML...')
                  // Fallback HTML
                  const html = `
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <title>Payload CMS Admin</title>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                      </head>
                      <body>
                        <div id="payload-admin">
                          <h1>Payload CMS 3.x Admin Panel</h1>
                          <p>Admin URL: ${adminURL}</p>
                          <p>Note: This is a fallback interface. The full admin panel should be available at the admin URL.</p>
                          <script>
                            console.log('Payload CMS 3.x Admin Panel loaded');
                          </script>
                        </div>
                      </body>
                    </html>
                  `
                  res.setHeader('Content-Type', 'text/html')
                  return res.status(200).send(html)
                }
              }
            }
            
            console.log('Redirecting to adminURL:', adminURL)
            return res.redirect(302, adminURL)
          } else {
            console.error('Payload client does not have requestHandler or getAdminURL method')
            console.error('Available methods:', Object.keys(payload || {}))
            return res.status(500).json({ 
              error: 'Payload CMS requestHandler/getAdminURL not available',
              details: 'Payload client does not have requestHandler or getAdminURL method',
              availableMethods: Object.keys(payload || {})
            })
          }
  } catch (error) {
    console.error('=== PAYLOAD CMS ERROR ===')
    console.error('Error type:', typeof error)
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    console.error('Full error object:', error)
    
    // Sprawdź czy to błąd timeout
    if (error instanceof Error && error.message.includes('timeout')) {
      console.error('Timeout error detected - Payload CMS initialization took too long')
      return res.status(504).json({ 
        error: 'Payload CMS initialization timeout',
        details: error.message,
        suggestion: 'Try accessing /admin endpoint instead'
      })
    }
    
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
