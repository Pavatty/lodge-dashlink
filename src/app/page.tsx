export default function HomePage() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      fontFamily: 'sans-serif',
      backgroundColor: '#f9fafb',
      color: '#111827'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Lodge DashLink</h1>
      <p style={{ fontSize: '1.2rem', color: '#4b5563' }}>
        Nouvelle architecture propre connectée et automatisée.
      </p>
    </div>
  );
}
