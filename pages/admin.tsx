import { GetServerSideProps } from 'next'
import { getPayload } from 'payload'
import config from '../payload.config'

export default function AdminPage() {
  return (
    <div style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}>
      <iframe 
        src="/api/payload"
        style={{ 
          width: '100%', 
          height: '100%', 
          border: 'none',
          margin: 0,
          padding: 0
        }}
        title="Payload CMS Admin"
      />
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
      props: {}
    }
  } catch (error) {
    console.error('Admin page error:', error)
    return {
      props: {}
    }
  }
}
