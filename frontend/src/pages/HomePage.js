import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import PollList from '../components/PollList';

const HomePage = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seedingDemo, setSeedingDemo] = useState(false);
  const [demoLoaded, setDemoLoaded] = useState(false);

  useEffect(() => {
    loadPolls();
  }, []);

  const loadPolls = async () => {
    try {
      const res = await api.get('/polls');
      setPolls(res.data);
      setLoading(false);
      if (res.data.length > 0) {
        setDemoLoaded(true);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const seedDemoData = async () => {
    setSeedingDemo(true);
    try {
      console.log('Sending seed-demo request...');
      const response = await api.post('/auth/seed-demo');
      console.log('Seed response:', response.data);
      alert('✅ Demo data loaded successfully!\n\nDemo Credentials:\nEmail: admin@votingsystem.com\nPassword: admin123');
      await loadPolls();
      setDemoLoaded(true);
    } catch (err) {
      console.error('Seed error:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Unknown error';
      if (errorMsg.includes('already exists')) {
        alert('⚠️ Demo data already exists!\n\nRefresh to see the polls.\n\nDemo Credentials:\nEmail: admin@votingsystem.com\nPassword: admin123');
        await loadPolls();
        setDemoLoaded(true);
      } else {
        alert('❌ Error loading demo data:\n' + errorMsg);
      }
    } finally {
      setSeedingDemo(false);
    }
  };

  return (
    <div>
      <h1>Voting System</h1>

      {/* Demo Section */}
      {!demoLoaded && (
        <div className="card demo-section" style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          borderColor: '#f5576c'
        }}>
          <div className="demo-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>🎉 Try Demo Polls</h3>
              <p style={{ margin: '0 0 0.5rem 0', color: 'rgba(255, 255, 255, 0.9)' }}>
                Load sample polls to explore the voting system with pre-populated data and results.
              </p>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                💡 You'll get demo login credentials after loading sample data.
              </p>
            </div>
            <button
              onClick={seedDemoData}
              disabled={seedingDemo}
              style={{
                background: 'white',
                color: '#f5576c',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: seedingDemo ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
                opacity: seedingDemo ? 0.7 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              {seedingDemo ? '⏳ Loading...' : '📋 Load Demo Polls'}
            </button>
          </div>
        </div>
      )}

      {!localStorage.getItem('token') && (
        <div className="card" style={{ background: '#f0f9ff', borderColor: '#0ea5e9' }}>
          <p className="text-center">
            Please <Link to="/login" style={{ color: '#0ea5e9', fontWeight: '600' }}>login</Link> to vote on polls.
          </p>
        </div>
      )}

      {loading ? (
        <div className="loading">
          <p>Loading polls...</p>
        </div>
      ) : polls.length === 0 ? (
        <div className="card text-center">
          <h3>No polls available</h3>
          <p>Check back later or create a new poll if you're an admin.</p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
            <p style={{ margin: 0, color: '#64748b', fontWeight: '500' }}>
              📊 {polls.length} poll{polls.length > 1 ? 's' : ''} available
            </p>
          </div>
          <PollList polls={polls} />
        </>
      )}
    </div>
  );
};

export default HomePage;