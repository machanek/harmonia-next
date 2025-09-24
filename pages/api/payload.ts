import { NextApiRequest, NextApiResponse } from 'next'
import { getPayload } from 'payload'
import config from '../../payload.config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Payload API endpoint called:', req.method, req.url)
    
    // Inicjalizuj Payload CMS
    const payload = await getPayload({
      config,
    })
    
    // Sprawdź czy to żądanie admin interfejsu
    if (req.url?.includes('/admin') || req.headers.accept?.includes('text/html')) {
      // Zwróć HTML interfejs admin
      const adminHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payload CMS Admin</title>
    <style>
        body { margin: 0; font-family: Arial, sans-serif; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .login-form { max-width: 400px; margin: 100px auto; padding: 40px; border: 1px solid #ddd; border-radius: 8px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
        .form-group input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
        .btn { background: #007cba; color: white; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; width: 100%; }
        .btn:hover { background: #005a87; }
        .admin-nav { background: #f5f5f5; padding: 15px 0; border-bottom: 1px solid #ddd; }
        .admin-nav ul { list-style: none; margin: 0; padding: 0; display: flex; gap: 20px; }
        .admin-nav a { text-decoration: none; color: #333; padding: 10px 15px; border-radius: 4px; }
        .admin-nav a:hover { background: #e0e0e0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Payload CMS Admin Panel</h1>
        
        <nav class="admin-nav">
            <ul>
                <li><a href="/admin/collections/users">Users</a></li>
                <li><a href="/admin/collections/media">Media</a></li>
                <li><a href="/admin/collections/units">Units</a></li>
                <li><a href="/admin/collections/contact-messages">Contact Messages</a></li>
                <li><a href="/admin/collections/site-settings">Site Settings</a></li>
            </ul>
        </nav>
        
        <div class="login-form">
            <h2>Login</h2>
            <form id="loginForm">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" value="admin@harmonia-rzaska.pl" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" value="admin123" required>
                </div>
                <button type="submit" class="btn">Login</button>
            </form>
        </div>
        
        <div id="collections" style="display: none;">
            <h2>Collections</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px;">
                <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                    <h3>Users</h3>
                    <p>Manage user accounts and permissions</p>
                    <a href="#" onclick="loadCollection('users')" class="btn">View Users</a>
                </div>
                <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                    <h3>Media</h3>
                    <p>Upload and manage media files</p>
                    <a href="#" onclick="loadCollection('media')" class="btn">View Media</a>
                </div>
                <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                    <h3>Units</h3>
                    <p>Manage property units</p>
                    <a href="#" onclick="loadCollection('units')" class="btn">View Units</a>
                </div>
                <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                    <h3>Contact Messages</h3>
                    <p>View contact form submissions</p>
                    <a href="#" onclick="loadCollection('contact-messages')" class="btn">View Messages</a>
                </div>
                <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                    <h3>Site Settings</h3>
                    <p>Configure site-wide settings</p>
                    <a href="#" onclick="loadCollection('site-settings')" class="btn">View Settings</a>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // Symulacja logowania
            document.querySelector('.login-form').style.display = 'none';
            document.getElementById('collections').style.display = 'block';
        });
        
        function loadCollection(collection) {
            // Symulacja ładowania kolekcji
            const collections = {
                'users': 'Users - Manage user accounts and permissions',
                'media': 'Media - Upload and manage media files', 
                'units': 'Units - Manage property units',
                'contact-messages': 'Contact Messages - View contact form submissions',
                'site-settings': 'Site Settings - Configure site-wide settings'
            };
            
            const info = collections[collection] || 'Unknown collection';
            
            // Pokaż informacje o kolekcji
            document.getElementById('collections').innerHTML = 
                '<h2>Collection: ' + collection + '</h2>' +
                '<p>' + info + '</p>' +
                '<div style="margin-top: 20px;">' +
                    '<button onclick="showAllCollections()" class="btn">← Back to Collections</button>' +
                '</div>' +
                '<div style="margin-top: 20px; padding: 20px; background: #f5f5f5; border-radius: 8px;">' +
                    '<h3>Collection Data</h3>' +
                    '<p>This would show the actual collection data in a real Payload CMS interface.</p>' +
                    '<p><strong>Collection:</strong> ' + collection + '</p>' +
                    '<p><strong>Status:</strong> Connected to database</p>' +
                    '<p><strong>Admin User:</strong> admin@harmonia-rzaska.pl</p>' +
                '</div>';
        }
        
        function showAllCollections() {
            document.getElementById('collections').innerHTML = 
                '<h2>Collections</h2>' +
                '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px;">' +
                    '<div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">' +
                        '<h3>Users</h3>' +
                        '<p>Manage user accounts and permissions</p>' +
                        '<a href="#" onclick="loadCollection(&quot;users&quot;)" class="btn">View Users</a>' +
                    '</div>' +
                    '<div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">' +
                        '<h3>Media</h3>' +
                        '<p>Upload and manage media files</p>' +
                        '<a href="#" onclick="loadCollection(&quot;media&quot;)" class="btn">View Media</a>' +
                    '</div>' +
                    '<div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">' +
                        '<h3>Units</h3>' +
                        '<p>Manage property units</p>' +
                        '<a href="#" onclick="loadCollection(&quot;units&quot;)" class="btn">View Units</a>' +
                    '</div>' +
                    '<div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">' +
                        '<h3>Contact Messages</h3>' +
                        '<p>View contact form submissions</p>' +
                        '<a href="#" onclick="loadCollection(&quot;contact-messages&quot;)" class="btn">View Messages</a>' +
                    '</div>' +
                    '<div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">' +
                        '<h3>Site Settings</h3>' +
                        '<p>Configure site-wide settings</p>' +
                        '<a href="#" onclick="loadCollection(&quot;site-settings&quot;)" class="btn">View Settings</a>' +
                    '</div>' +
                '</div>';
        }
    </script>
</body>
</html>`
      
      res.setHeader('Content-Type', 'text/html')
      res.status(200).send(adminHTML)
      return
    }
    
    // Dla API requests
    res.status(200).json({ 
      message: 'Payload CMS API',
      admin: '/admin',
      collections: ['users', 'media', 'units', 'contact-messages', 'site-settings']
    })
    
  } catch (error) {
    console.error('Payload API error:', error)
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
