import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface CollectionData {
  id: string
  title: string
  slug: string
  count: number
}

export default function AdminPage() {
  const [collections, setCollections] = useState<CollectionData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Symulacja ładowania kolekcji
    const loadCollections = async () => {
      try {
        setLoading(true)
        // Symulowane dane kolekcji
        const mockCollections: CollectionData[] = [
          { id: '1', title: 'Użytkownicy', slug: 'users', count: 0 },
          { id: '2', title: 'Media', slug: 'media', count: 0 },
          { id: '3', title: 'Lokale', slug: 'units', count: 0 },
          { id: '4', title: 'Wiadomości', slug: 'contact-messages', count: 0 },
          { id: '5', title: 'Ustawienia', slug: 'site-settings', count: 0 },
        ]
        
        // Symulacja opóźnienia
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setCollections(mockCollections)
        setLoading(false)
      } catch {
        setError('Błąd ładowania kolekcji')
        setLoading(false)
      }
    }

    loadCollections()
  }, [])

  const handleCollectionClick = (slug: string) => {
    // Przekieruj do szczegółów kolekcji
    router.push(`/admin/collections/${slug}`)
  }

  if (loading) {
    return (
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h1>Payload CMS Admin Panel</h1>
        <p>Ładowanie...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h1>Payload CMS Admin Panel</h1>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>Payload CMS</h1>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>Panel administracyjny dla Harmonia Rząska</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#0070f3', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => router.push('/api/payload')}
          >
            API Info
          </button>
        </div>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Kolekcje</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          {collections.map((collection) => (
            <div 
              key={collection.id}
              style={{ 
                border: '1px solid #e1e5e9', 
                padding: '20px', 
                borderRadius: '8px',
                backgroundColor: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
              onClick={() => handleCollectionClick(collection.slug)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>
                  {collection.title}
                </h3>
                <span style={{ 
                  backgroundColor: '#f0f0f0', 
                  padding: '4px 8px', 
                  borderRadius: '12px', 
                  fontSize: '0.8rem',
                  color: '#666'
                }}>
                  {collection.count} elementów
                </span>
              </div>
              <p style={{ margin: '10px 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                Zarządzaj {collection.title.toLowerCase()}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        border: '1px solid #e1e5e9'
      }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem' }}>Dostępne API</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <strong>GraphQL:</strong>
            <br />
            <code style={{ backgroundColor: '#e9ecef', padding: '2px 6px', borderRadius: '3px' }}>
              /api/payload/graphql
            </code>
          </div>
          <div>
            <strong>REST API:</strong>
            <br />
            <code style={{ backgroundColor: '#e9ecef', padding: '2px 6px', borderRadius: '3px' }}>
              /api/payload/*
            </code>
          </div>
          <div>
            <strong>Health Check:</strong>
            <br />
            <code style={{ backgroundColor: '#e9ecef', padding: '2px 6px', borderRadius: '3px' }}>
              /api/health
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
