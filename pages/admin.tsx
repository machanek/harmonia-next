import { GetServerSideProps } from 'next'
import { getPayload } from 'payload'
import payloadConfig from '../payload.config'

export default function AdminPage() {
  return (
    <div style={{ height: '100vh' }}>
      <iframe
        src="/api/payload"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Payload CMS Admin"
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Initialize Payload CMS
    const payload = await getPayload({ config: payloadConfig as any })
    
    // Check if user is authenticated (you can add authentication logic here)
    // For now, we'll just return the page
    
    return {
      props: {},
    }
  } catch (error) {
    console.error('Error initializing Payload CMS:', error)
    return {
      props: {},
    }
  }
}