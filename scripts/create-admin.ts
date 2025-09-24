import { getPayload } from 'payload'
import payloadConfig from '../payload.config'

async function createAdmin() {
  try {
    console.log('Creating admin user...')
    
    // Initialize Payload CMS
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = await getPayload({ config: payloadConfig as any })
    
    // Check if admin user already exists
    const existingUsers = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'admin@harmonia-rzaska.pl'
        }
      }
    })
    
    if (existingUsers.docs.length > 0) {
      console.log('Admin user already exists')
      return
    }
    
    // Create admin user
    const adminUser = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@harmonia-rzaska.pl',
        password: 'admin123',
        name: 'Administrator',
        role: 'admin'
      }
    })
    
    console.log('Admin user created successfully:', adminUser.id)
    console.log('Email: admin@harmonia-rzaska.pl')
    console.log('Password: admin123')
    
  } catch (error) {
    console.error('Error creating admin user:', error)
  }
}

createAdmin()
