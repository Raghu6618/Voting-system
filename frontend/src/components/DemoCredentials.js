const DemoCredentials = () => {
  return (
    <div className="card" style={{
      background: '#f8fafc',
      borderLeft: '4px solid #667eea'
    }}>
      <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>
        📚 Demo Credentials
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        {/* Admin Account */}
        <div style={{
          background: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{ color: '#475569', marginBottom: '0.5rem', marginTop: 0 }}>
            👨‍💼 Admin Account
          </h4>
          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Email:</strong> admin@votingsystem.com
            </p>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Password:</strong> admin123
            </p>
            <p style={{ 
              margin: '0.5rem 0 0 0',
              color: '#667eea',
              fontSize: '0.85rem'
            }}>
              ✓ Can create and delete polls
            </p>
          </div>
        </div>

        {/* User Accounts */}
        <div style={{
          background: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{ color: '#475569', marginBottom: '0.5rem', marginTop: 0 }}>
            👥 Demo User Accounts
          </h4>
          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Emails:</strong>
            </p>
            <ul style={{ margin: '0.25rem 0', paddingLeft: '1.25rem' }}>
              <li>john@votingsystem.com</li>
              <li>jane@votingsystem.com</li>
              <li>mike@votingsystem.com</li>
            </ul>
            <p style={{ 
              margin: '0.5rem 0 0 0',
              color: '#667eea',
              fontSize: '0.85rem'
            }}>
              Password: user123
            </p>
          </div>
        </div>
      </div>

      <div style={{
        background: '#ecfdf5',
        border: '1px solid #d1fae5',
        borderRadius: '8px',
        padding: '0.75rem',
        color: '#065f46',
        fontSize: '0.9rem'
      }}>
        <strong>💡 Tip:</strong> The demo includes 8 pre-made polls with sample votes. 
        Try voting on different polls and see the results change in real-time!
      </div>
    </div>
  );
};

export default DemoCredentials;
