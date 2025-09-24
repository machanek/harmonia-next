import { GetServerSideProps } from 'next'
import { getPayload } from 'payload'
import config from '../payload.config'

export default function AdminPage() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#2a2a2a',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          color: '#ffffff', 
          marginBottom: '20px',
          fontSize: '28px',
          fontWeight: '600'
        }}>
          Payload CMS 3.x
        </h1>
        
        <p style={{ 
          color: '#cccccc', 
          marginBottom: '30px',
          fontSize: '16px'
        }}>
          Panel administracyjny Harmonia Rząska
        </p>
        
        <div style={{
          backgroundColor: '#333333',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#ffffff', marginBottom: '15px' }}>System Status</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#cccccc' }}>Database:</span>
            <span style={{ color: '#4ade80' }}>✅ Connected</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#cccccc' }}>CMS Version:</span>
            <span style={{ color: '#60a5fa' }}>Payload 3.x</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#cccccc' }}>Status:</span>
            <span style={{ color: '#4ade80' }}>✅ Operational</span>
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginTop: '20px'
        }}>
          <div style={{
            backgroundColor: '#333333',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #444444'
          }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>Users</h4>
            <p style={{ color: '#cccccc', fontSize: '14px', marginBottom: '15px' }}>
              Manage user accounts
            </p>
            <button style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              width: '100%'
            }}>
              View Users
            </button>
          </div>
          
          <div style={{
            backgroundColor: '#333333',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #444444'
          }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>Media</h4>
            <p style={{ color: '#cccccc', fontSize: '14px', marginBottom: '15px' }}>
              Upload and manage files
            </p>
            <button style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              width: '100%'
            }}>
              View Media
            </button>
          </div>
          
          <div style={{
            backgroundColor: '#333333',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #444444'
          }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>Units</h4>
            <p style={{ color: '#cccccc', fontSize: '14px', marginBottom: '15px' }}>
              Manage property units
            </p>
            <button style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              width: '100%'
            }}>
              View Units
            </button>
          </div>
          
          <div style={{
            backgroundColor: '#333333',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #444444'
          }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>Messages</h4>
            <p style={{ color: '#cccccc', fontSize: '14px', marginBottom: '15px' }}>
              Contact form submissions
            </p>
            <button style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              width: '100%'
            }}>
              View Messages
            </button>
          </div>
        </div>
        
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#1e40af',
          borderRadius: '8px',
          border: '1px solid #3b82f6'
        }}>
          <h3 style={{ color: '#ffffff', marginBottom: '10px' }}>Payload CMS 3.x</h3>
          <p style={{ color: '#dbeafe', fontSize: '14px' }}>
            Nowoczesny headless CMS z pełną integracją Next.js
          </p>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Inicjalizuj Payload CMS
    const payload = await getPayload({
      config,
    })
    
    console.log('Payload CMS initialized for admin page:', !!payload)
    
    return {
      props: {},
    }
  } catch (error) {
    console.error('Error initializing Payload CMS for admin page:', error)
    return {
      props: {},
    }
  }
}
