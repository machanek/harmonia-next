import { getPayload } from 'payload'
import { GetServerSideProps } from 'next'
import payloadConfig from '../payload.config'

// This page renders the Payload CMS admin interface
export default function AdminPage() {
  return (
    <div>
      <h1>Loading Payload CMS Admin...</h1>
      <script dangerouslySetInnerHTML={{
        __html: `
          // Redirect to the actual admin interface
          window.location.href = '/api/payload-admin';
        `
      }} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Initialize Payload CMS
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = await getPayload({ config: payloadConfig as any })
    
    // Get the admin URL
    const adminURL = payload.getAdminURL()
    console.log('Admin URL:', adminURL)
    
    // If admin URL is available, redirect to it
    if (adminURL && adminURL !== '/admin') {
      return {
        redirect: {
          destination: adminURL,
          permanent: false,
        },
      }
    }
    
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
