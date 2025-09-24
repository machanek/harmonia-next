import { GetServerSideProps } from 'next'
import { getPayload } from 'payload'
import config from '../../payload.config'

interface AdminPageProps {
  payloadInitialized: boolean
  collectionsData: {
    users: number
    media: number
    units: number
    contactMessages: number
    siteSettings: number
  }
}

export default function AdminPage({ payloadInitialized, collectionsData }: AdminPageProps) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f0f0f', 
      color: '#ffffff', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Payload CMS 3.x Admin
          </h1>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>
            Zarządzaj zawartością swojej strony
          </p>
        </header>

        <div style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2rem', 
          borderRadius: '12px', 
          marginBottom: '2rem',
          border: '1px solid #333'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#fff' }}>Status systemu</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              backgroundColor: payloadInitialized ? '#22c55e' : '#ef4444'
            }}></div>
            <span style={{ color: '#ccc' }}>
              Payload CMS: {payloadInitialized ? 'Połączono' : 'Błąd połączenia'}
            </span>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {Object.entries(collectionsData).map(([collection, count]) => (
            <div 
              key={collection}
              style={{ 
                backgroundColor: '#1a1a1a', 
                padding: '2rem', 
                borderRadius: '12px',
                border: '1px solid #333',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#252525'
                e.currentTarget.style.borderColor = '#555'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1a1a'
                e.currentTarget.style.borderColor = '#333'
              }}
              onClick={() => {
                window.location.href = `/admin/collections/${collection}`
              }}
            >
              <h3 style={{ 
                marginBottom: '1rem', 
                color: '#fff',
                textTransform: 'capitalize',
                fontSize: '1.3rem'
              }}>
                {collection === 'contactMessages' ? 'Contact Messages' : 
                 collection === 'siteSettings' ? 'Site Settings' : collection}
              </h3>
              <p style={{ 
                color: '#888', 
                marginBottom: '1rem',
                fontSize: '0.9rem'
              }}>
                Zarządzaj zawartością kolekcji
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <span style={{ 
                  color: '#667eea', 
                  fontWeight: 'bold',
                  fontSize: '1.5rem'
                }}>
                  {count}
                </span>
                <span style={{ color: '#888', fontSize: '0.9rem' }}>
                  elementów
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          marginTop: '3rem', 
          textAlign: 'center', 
          color: '#666',
          fontSize: '0.9rem'
        }}>
          <p>Payload CMS 3.x • Harmonia Rząska • {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    console.log('Admin page: Initializing Payload CMS...')
    const payload = await getPayload({ config })
    console.log('Admin page: Payload CMS initialized successfully')
    
    // Pobierz liczby elementów z każdej kolekcji z bardziej szczegółowym obsługiwaniem błędów
    const collectionsData = {
      users: 0,
      media: 0,
      units: 0,
      contactMessages: 0,
      siteSettings: 0
    }

    try {
      const users = await payload.count({ collection: 'users' })
      collectionsData.users = users.totalDocs
      console.log('Admin page: Users count:', users.totalDocs)
    } catch (error) {
      console.error('Admin page: Error counting users:', error)
    }

    try {
      const media = await payload.count({ collection: 'media' })
      collectionsData.media = media.totalDocs
      console.log('Admin page: Media count:', media.totalDocs)
    } catch (error) {
      console.error('Admin page: Error counting media:', error)
    }

    try {
      const units = await payload.count({ collection: 'units' })
      collectionsData.units = units.totalDocs
      console.log('Admin page: Units count:', units.totalDocs)
    } catch (error) {
      console.error('Admin page: Error counting units:', error)
    }

    try {
      const contactMessages = await payload.count({ collection: 'contact-messages' })
      collectionsData.contactMessages = contactMessages.totalDocs
      console.log('Admin page: Contact messages count:', contactMessages.totalDocs)
    } catch (error) {
      console.error('Admin page: Error counting contact-messages:', error)
    }

    try {
      const siteSettings = await payload.count({ collection: 'site-settings' })
      collectionsData.siteSettings = siteSettings.totalDocs
      console.log('Admin page: Site settings count:', siteSettings.totalDocs)
    } catch (error) {
      console.error('Admin page: Error counting site-settings:', error)
    }

    console.log('Admin page: All collections counted successfully')
    return {
      props: {
        payloadInitialized: true,
        collectionsData
      }
    }
  } catch (error) {
    console.error('Admin page error:', error)
    
    return {
      props: {
        payloadInitialized: false,
        collectionsData: {
          users: 0,
          media: 0,
          units: 0,
          contactMessages: 0,
          siteSettings: 0
        }
      }
    }
  }
}
