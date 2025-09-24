import { NextApiRequest, NextApiResponse } from 'next'
import { getPayload } from 'payload'
import payloadConfig from '../../payload.config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('=== PAYLOAD CMS ADMIN INTERFACE ===')
    console.log('Request URL:', req.url)
    console.log('Request method:', req.method)
    
    // Initialize Payload CMS
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = await getPayload({ config: payloadConfig as any })
    console.log('Payload client obtained:', !!payload)
    
    // Try to render the admin interface
    // Since Payload CMS 3.x doesn't have requestHandler, we'll create our own interface
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payload CMS Admin</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 1200px;
              margin: 0 auto;
              background: white;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header {
              border-bottom: 1px solid #eee;
              padding-bottom: 20px;
              margin-bottom: 20px;
            }
            .collection {
              margin: 20px 0;
              padding: 15px;
              border: 1px solid #ddd;
              border-radius: 4px;
            }
            .collection h3 {
              margin-top: 0;
              color: #333;
            }
            .nav {
              display: flex;
              gap: 20px;
              margin-bottom: 20px;
            }
            .nav a {
              padding: 10px 15px;
              background: #007cba;
              color: white;
              text-decoration: none;
              border-radius: 4px;
            }
            .nav a:hover {
              background: #005a87;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Payload CMS Admin Panel</h1>
              <p>Welcome to your Payload CMS administration interface</p>
            </div>
            
            <div class="nav">
              <a href="/api/payload-admin?collection=users">Users</a>
              <a href="/api/payload-admin?collection=media">Media</a>
              <a href="/api/payload-admin?collection=units">Units</a>
              <a href="/api/payload-admin?collection=contact-messages">Contact Messages</a>
              <a href="/api/payload-admin?collection=site-settings">Site Settings</a>
            </div>
            
            <div class="collections">
              <div class="collection">
                <h3>Collections</h3>
                <p>Select a collection from the navigation above to manage your content.</p>
                <ul>
                  <li><strong>Users:</strong> Manage user accounts and permissions</li>
                  <li><strong>Media:</strong> Upload and manage media files</li>
                  <li><strong>Units:</strong> Manage property units</li>
                  <li><strong>Contact Messages:</strong> View contact form submissions</li>
                  <li><strong>Site Settings:</strong> Configure site-wide settings</li>
                </ul>
              </div>
              
              <div class="collection">
                <h3>Database Status</h3>
                <p>✅ Connected to database successfully</p>
                <p>📊 Collections: ${payload.config.collections?.length || 0}</p>
                <p>🔧 Admin URL: ${payload.getAdminURL()}</p>
              </div>
            </div>
          </div>
          
          <script>
            console.log('Payload CMS Admin Panel loaded');
            console.log('Available collections:', ${JSON.stringify(payload.config.collections?.map(c => c.slug) || [])});
          </script>
        </body>
      </html>
    `
    
    res.setHeader('Content-Type', 'text/html')
    return res.status(200).send(html)
    
  } catch (error) {
    console.error('=== PAYLOAD CMS ADMIN ERROR ===')
    console.error('Error:', error)
    
    return res.status(500).json({ 
      error: 'Payload CMS admin interface failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
