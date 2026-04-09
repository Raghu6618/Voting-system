import { useEffect, useState, useCallback, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const PollDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);
  const [votedOption, setVotedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState('');

  const loadPoll = useCallback(async () => {
    try {
      setError('');
      const res = await api.get(`/polls/${id}`);
      setPoll(res.data);

      // Check if user has already voted
      if (isAuthenticated) {
        try {
          const voteCheck = await api.get(`/polls/${id}/hasVoted`);
          if (voteCheck.data.hasVoted) {
            setVoted(true);
            setVotedOption(voteCheck.data.optionIndex);
          }
        } catch (err) {
          // User hasn't voted or error checking
        }
      }

      setLoading(false);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Unable to load poll';
      setError(errorMsg);
      setLoading(false);
    }
  }, [id, isAuthenticated]);

  useEffect(() => {
    loadPoll();
  }, [loadPoll]);

  const vote = async (index) => {
    if (!isAuthenticated) {
      alert('Please login to vote');
      navigate('/login');
      return;
    }

    setVoting(true);
    try {
      await api.post('/polls/vote', { pollId: id, optionIndex: index });
      setVoted(true);
      setVotedOption(index);
      await loadPoll(); // Refresh poll data
      alert('✓ Your vote has been recorded!');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to vote';
      alert('❌ ' + errorMsg);
    } finally {
      setVoting(false);
    }
  };

  const deletePoll = async () => {
    if (window.confirm('Are you sure you want to delete this poll? This action cannot be undone.')) {
      try {
        await api.delete(`/polls/${id}`);
        alert('✓ Poll deleted successfully');
        navigate('/');
      } catch (err) {
        alert('❌ ' + (err.response?.data?.error || 'Unable to delete poll'));
      }
    }
  };

  if (loading) {
    return (
      <div className="loading" style={{ textAlign: 'center', padding: '40px' }}>
        <p>📥 Loading poll...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message card" style={{ background: '#fee2e2', borderColor: '#ef4444' }}>
        <p>❌ {error}</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="error-message card" style={{ background: '#fee2e2', borderColor: '#ef4444' }}>
        <p>❌ Poll not found</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1>{poll.question}</h1>
          {poll.description && <p style={{ color: '#666', marginLeft: '0' }}>{poll.description}</p>}
        </div>
        {isAdmin && (
          <button onClick={deletePoll} className="btn btn-danger">
            🗑️ Delete Poll
          </button>
        )}
      </div>

      {!isAuthenticated && (
        <div className="card" style={{ background: '#fef3c7', borderColor: '#f59e0b', marginBottom: '1.5rem' }}>
          <p style={{ textAlign: 'center', margin: 0 }}>
            🔐 <strong>Please <a href="/login" style={{ color: '#667eea' }}>login</a> or <a href="/signup" style={{ color: '#667eea' }}>signup</a> to vote on this poll.</strong>
          </p>
        </div>
      )}

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginTop: 0 }}>📊 Polling Results</h3>
        {poll.options.map((opt, i) => {
          const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
          const isUserVote = voted && votedOption === i;
          return (
            <div
              key={i}
              className="card"
              style={{
                marginBottom: '1rem',
                padding: '1rem',
                background: isUserVote ? '#f0fdf4' : '#f9fafb',
                borderColor: isUserVote ? '#10b981' : '#e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '600' }}>
                    {opt.text}
                    {isUserVote && ' ✓ (Your Vote)'}
                  </span>
                  <span style={{ color: '#666' }}>{opt.votes} votes ({percentage}%)</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${percentage}%`,
                      background: isUserVote ?
                        'linear-gradient(90deg, #10b981 0%, #059669 100%)' :
                        'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => vote(i)}
                disabled={voted || voting || !isAuthenticated}
                className={`btn ${isUserVote ? 'btn-success' : 'btn-primary'}`}
                style={{ marginLeft: '1rem', whiteSpace: 'nowrap' }}
              >
                {isUserVote ? '✓ Your Vote' : voted ? 'Already Voted' : voting ? '⏳ Voting...' : '🗳️ Vote'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p><strong>📈 Total Votes:</strong> {totalVotes}</p>
            <p><strong>👤 Created by:</strong> {poll.createdBy?.name || 'Unknown'}</p>
            {poll.createdBy?.email && <p><strong>✉️ Email:</strong> {poll.createdBy.email}</p>}
            {totalVotes > 0 && (
              <p><strong>🏆 Leading:</strong> {
                poll.options.reduce((prev, current) =>
                  (prev.votes > current.votes) ? prev : current
                ).text
              }</p>
            )}
          </div>
          {voted && (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2rem',
                fontWeight: 'bold',
                margin: '0 auto 0.5rem',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}>
                ✓
              </div>
              <p style={{ color: '#10b981', fontWeight: '600', margin: 0 }}>Your Vote Recorded!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollDetailPage;