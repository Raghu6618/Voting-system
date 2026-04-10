import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const AdminDashboard = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ total: 0, totalVotes: 0, mostPopular: null });

  useEffect(() => {
    loadPolls();
  }, []);

  const loadPolls = async () => {
    try {
      setError('');
      const res = await api.get('/polls');
      setPolls(res.data);

      // Calculate statistics
      let totalVotes = 0;
      let mostVotes = 0;
      let mostPopular = null;

      res.data.forEach((poll) => {
        const pollVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
        totalVotes += pollVotes;

        if (pollVotes > mostVotes) {
          mostVotes = pollVotes;
          mostPopular = poll;
        }
      });

      setStats({
        total: res.data.length,
        totalVotes,
        mostPopular
      });

      setLoading(false);
    } catch (err) {
      setError('Failed to load polls');
      setLoading(false);
    }
  };

  const deletePoll = async (pollId) => {
    if (window.confirm('Are you sure you want to delete this poll? This action cannot be undone.')) {
      try {
        await api.delete(`/polls/${pollId}`);
        alert('✓ Poll deleted successfully');
        await loadPolls();
      } catch (err) {
        alert('❌ ' + (err.response?.data?.error || 'Failed to delete poll'));
      }
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>📥 Loading dashboard...</div>;
  }

  return (
    <div>
      <h1>📊 Admin Dashboard</h1>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        Manage polls, view statistics, and control elections
      </p>

      {/* Stats Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>📋 Total Polls</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.total}</p>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>🗳️ Total Votes</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.totalVotes}</p>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>🏆 Most Popular</h3>
          <p style={{ fontSize: '1rem', fontWeight: 'bold', margin: 0 }}>
            {stats.mostPopular ? stats.mostPopular.question.substring(0, 20) + '...' : 'No polls yet'}
          </p>
        </div>
      </div>

      {error && (
        <div className="card" style={{ background: '#fee2e2', borderColor: '#ef4444', marginBottom: '1rem' }}>
          <p>❌ {error}</p>
        </div>
      )}

      {/* Polls Management Section */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0 }}>📝 Manage Polls</h2>
          <Link to="/create" className="btn btn-primary">
            ➕ Create New Poll
          </Link>
        </div>

        {polls.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            background: '#f9fafb',
            borderRadius: '8px',
            border: '2px dashed #d0d0d0'
          }}>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>📭 No polls yet</p>
            <Link to="/create" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Create Your First Poll
            </Link>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>📋 Question</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>🗳️ Votes</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>🎯 Options</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>📅 Created</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>⚙️ Actions</th>
                </tr>
              </thead>
              <tbody>
                {polls.map((poll) => {
                  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
                  const createdDate = new Date(poll.createdAt).toLocaleDateString();
                  return (
                    <tr key={poll._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '1rem', maxWidth: '300px' }}>
                        <strong style={{ color: '#667eea' }}>{poll.question.substring(0, 50)}</strong>
                        {poll.question.length > 50 && '...'}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>
                        {totalVotes}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        {poll.options.length}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                        {createdDate}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <Link
                            to={`/poll/${poll._id}`}
                            className="btn"
                            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: '#667eea', color: 'white' }}
                          >
                            👁️ View
                          </Link>
                          <button
                            onClick={() => deletePoll(poll._id)}
                            className="btn btn-danger"
                            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginTop: '1.5rem', background: '#f0fdf4', borderLeft: '4px solid #10b981' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#065f46' }}>⚡ Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/create" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            ➕ Create Poll
          </Link>
          <button
            onClick={loadPolls}
            className="btn"
            style={{ background: '#059669', color: 'white', cursor: 'pointer', border: 'none' }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
