import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/api';

const PollCard = ({ poll }) => {
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const checkVoteStatus = async () => {
      if (localStorage.getItem('token')) {
        try {
          const response = await api.get(`/polls/${poll._id}/hasVoted`);
          setHasVoted(response.data.hasVoted);
        } catch (err) {
          // User hasn't voted or error
        }
      }
    };

    checkVoteStatus();
  }, [poll._id]);

  return (
    <div className="card poll-card">
      <div className="flex items-center justify-between mb-2">
        <h3>{poll.question}</h3>
        {hasVoted && (
          <span className="vote-indicator" style={{
            background: '#10b981',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            ✓ Voted
          </span>
        )}
      </div>
      <div className="poll-meta">
        Created by: {poll.createdBy?.name || 'Unknown'}
      </div>
      <Link to={`/poll/${poll._id}`} className="poll-link">
        {hasVoted ? 'View Results →' : 'Vote Now →'}
      </Link>
    </div>
  );
};

export default PollCard;