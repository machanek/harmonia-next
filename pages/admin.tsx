export default function AdminPage() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Payload CMS Admin Panel</h1>
      <p>Panel administracyjny Payload CMS dla Harmonia Rząska</p>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Kolekcje</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h3>Użytkownicy</h3>
            <p>Zarządzaj użytkownikami systemu</p>
            <a href="/api/payload/collections/users" style={{ color: '#0070f3', textDecoration: 'none' }}>
              Przejdź do kolekcji →
            </a>
          </div>
          
          <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h3>Media</h3>
            <p>Zarządzaj plikami i obrazami</p>
            <a href="/api/payload/collections/media" style={{ color: '#0070f3', textDecoration: 'none' }}>
              Przejdź do kolekcji →
            </a>
          </div>
          
          <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h3>Lokale</h3>
            <p>Zarządzaj dostępnymi lokalami</p>
            <a href="/api/payload/collections/units" style={{ color: '#0070f3', textDecoration: 'none' }}>
              Przejdź do kolekcji →
            </a>
          </div>
          
          <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h3>Wiadomości</h3>
            <p>Zarządzaj wiadomościami kontaktowymi</p>
            <a href="/api/payload/collections/contact-messages" style={{ color: '#0070f3', textDecoration: 'none' }}>
              Przejdź do kolekcji →
            </a>
          </div>
          
          <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h3>Ustawienia</h3>
            <p>Zarządzaj ustawieniami strony</p>
            <a href="/api/payload/collections/site-settings" style={{ color: '#0070f3', textDecoration: 'none' }}>
              Przejdź do kolekcji →
            </a>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>API Endpoints</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '10px 0' }}>
            <strong>GraphQL:</strong> <code>/api/payload/graphql</code>
          </li>
          <li style={{ margin: '10px 0' }}>
            <strong>REST API:</strong> <code>/api/payload/*</code>
          </li>
          <li style={{ margin: '10px 0' }}>
            <strong>Health Check:</strong> <code>/api/health</code>
          </li>
        </ul>
      </div>
    </div>
  )
}
