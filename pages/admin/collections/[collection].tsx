import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getPayload } from 'payload'
import config from '../../../payload.config'

interface CollectionPageProps {
  collection: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  documents: any[]
  totalDocs: number
  error?: string
}

export default function CollectionPage({ collection, documents, totalDocs, error }: CollectionPageProps) {
  const router = useRouter()

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0f0f0f', 
        color: '#ffffff', 
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#ef4444', marginBottom: '1rem' }}>Błąd</h1>
          <p style={{ color: '#888', marginBottom: '2rem' }}>{error}</p>
          <button 
            onClick={() => router.push('/admin')}
            style={{
              backgroundColor: '#667eea',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            ← Powrót do panelu admin
          </button>
        </div>
      </div>
    )
  }

  const formatCollectionName = (name: string) => {
    switch (name) {
      case 'contact-messages': return 'Contact Messages'
      case 'site-settings': return 'Site Settings'
      default: return name.charAt(0).toUpperCase() + name.slice(1)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f0f0f', 
      color: '#ffffff', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <button 
            onClick={() => router.push('/admin')}
            style={{
              backgroundColor: 'transparent',
              color: '#667eea',
              border: '1px solid #667eea',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            ← Powrót
          </button>
          <div>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {formatCollectionName(collection)}
            </h1>
            <p style={{ color: '#888', fontSize: '1.1rem' }}>
              Łącznie: {totalDocs} elementów
            </p>
          </div>
        </header>

        {documents.length === 0 ? (
          <div style={{ 
            backgroundColor: '#1a1a1a', 
            padding: '3rem', 
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid #333'
          }}>
            <h3 style={{ color: '#888', marginBottom: '1rem' }}>Brak elementów</h3>
            <p style={{ color: '#666' }}>Ta kolekcja nie zawiera jeszcze żadnych elementów.</p>
          </div>
        ) : (
          <div style={{ 
            backgroundColor: '#1a1a1a', 
            borderRadius: '12px',
            border: '1px solid #333',
            overflow: 'hidden'
          }}>
            <div style={{ 
              padding: '1.5rem', 
              borderBottom: '1px solid #333',
              backgroundColor: '#252525'
            }}>
              <h2 style={{ color: '#fff', margin: 0 }}>Elementy kolekcji</h2>
            </div>
            
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {documents.map((doc, index) => (
                <div 
                  key={doc.id || index}
                  style={{ 
                    padding: '1.5rem',
                    borderBottom: index < documents.length - 1 ? '1px solid #333' : 'none',
                    backgroundColor: index % 2 === 0 ? '#1a1a1a' : '#1f1f1f'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>
                        ID: {doc.id || 'N/A'}
                      </h4>
                      <div style={{ color: '#888', fontSize: '0.9rem' }}>
                        {Object.entries(doc).slice(0, 5).map(([key, value]) => (
                          <div key={key} style={{ marginBottom: '0.25rem' }}>
                            <strong style={{ color: '#667eea' }}>{key}:</strong>{' '}
                            {typeof value === 'string' ? 
                              (value.length > 100 ? value.substring(0, 100) + '...' : value) :
                              JSON.stringify(value)
                            }
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: '#666',
                      textAlign: 'right'
                    }}>
                      {doc.createdAt && (
                        <div>Utworzono: {new Date(doc.createdAt).toLocaleDateString('pl-PL')}</div>
                      )}
                      {doc.updatedAt && (
                        <div>Aktualizowano: {new Date(doc.updatedAt).toLocaleDateString('pl-PL')}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ 
          marginTop: '3rem', 
          textAlign: 'center', 
          color: '#666',
          fontSize: '0.9rem'
        }}>
          <p>Payload CMS 3.x • Kolekcja: {formatCollectionName(collection)}</p>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { collection } = context.params as { collection: string }

  try {
    const payload = await getPayload({ config })
    
    // Mapowanie nazw kolekcji
    const collectionMap: { [key: string]: string } = {
      'users': 'users',
      'media': 'media',
      'units': 'units',
      'contactMessages': 'contact-messages',
      'siteSettings': 'site-settings'
    }

    const actualCollection = collectionMap[collection] || collection

    // Sprawdź czy kolekcja istnieje
    const availableCollections = ['users', 'media', 'units', 'contact-messages', 'site-settings']
    if (!availableCollections.includes(actualCollection)) {
      return {
        props: {
          collection,
          documents: [],
          totalDocs: 0,
          error: `Kolekcja "${collection}" nie istnieje. Dostępne kolekcje: ${availableCollections.join(', ')}`
        }
      }
    }

    const result = await payload.find({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: actualCollection as any,
      limit: 50,
      sort: '-createdAt'
    })

    return {
      props: {
        collection,
        documents: result.docs,
        totalDocs: result.totalDocs
      }
    }
  } catch (error) {
    console.error(`Collection page error for ${collection}:`, error)
    
    return {
      props: {
        collection,
        documents: [],
        totalDocs: 0,
        error: `Błąd podczas ładowania kolekcji "${collection}": ${error instanceof Error ? error.message : 'Nieznany błąd'}`
      }
    }
  }
}
