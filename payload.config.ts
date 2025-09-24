import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Units } from './collections/Units'
import { ContactMessages } from './collections/ContactMessages'
import { SiteSettings } from './collections/SiteSettings'

// Walidacja i konstrukcja DATABASE_URI
function getDatabaseUri(): string {
  let databaseUri = process.env.DATABASE_URI;
  
  // Sprawdź czy DATABASE_URI używa Direct Connection (niepożądane dla serverless)
  if (databaseUri && databaseUri.includes('db.rrpzjktpdgpmmgmyxywn.supabase.co')) {
    console.log('DATABASE_URI uses Direct Connection, switching to Transaction Pooler');
    databaseUri = undefined; // Wymuś użycie Transaction Pooler
  }
  
  // Jeśli DATABASE_URI nie istnieje lub używa Direct Connection, skonstruuj z Supabase
  if (!databaseUri && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    try {
      const supabaseUrl = new URL(process.env.SUPABASE_URL);
      // Użyj Transaction Pooler dla serverless
      const hostname = 'aws-1-eu-central-1.pooler.supabase.com';
      const port = 6543;
      const user = 'postgres.rrpzjktpdgpmmgmyxywn';
      // Użyj hasła z panelu Supabase zamiast SUPABASE_ANON_KEY
      const password = 'vp2TAY$w!EM#4E9f';
      
      databaseUri = `postgresql://${user}:${encodeURIComponent(password)}@${hostname}:${port}/postgres`;
      console.log('Constructed DATABASE_URI from Supabase with Transaction Pooler');
    } catch (error) {
      console.error('Failed to construct DATABASE_URI from Supabase:', error);
    }
  }
  
  if (!databaseUri) {
    throw new Error('DATABASE_URI not configured and cannot construct from Supabase');
  }
  
  // Walidacja formatu URL
  try {
    new URL(databaseUri);
    console.log('DATABASE_URI validation passed:', databaseUri.substring(0, 50) + '...');
  } catch (error) {
    console.error('Invalid DATABASE_URI format:', error);
    throw new Error('Invalid DATABASE_URI format');
  }
  
  return databaseUri;
}

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-here',
  admin: {
    user: Users.slug,
  },
  editor: lexicalEditor({}),
  collections: [Users, Media, Units, ContactMessages, SiteSettings],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [],
  db: postgresAdapter({
    pool: {
      connectionString: getDatabaseUri(),
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    },
  }),
})
