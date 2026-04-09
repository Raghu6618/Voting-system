import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const CreatePollPage = () => {
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);

  // Redirect non-admins
  if (isAdmin === false) {
    return (
      <div className="card" style={{ background: '#fee2e2', borderColor: '#ef4444' }}>
        <p style={{ textAlign: 'center' }}>
          ❌ <strong>Admin access required to create polls.</strong>
        </p>
      </div>
    );
  }

  const addOption = () => setOptions([...options, '']);

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!question.trim()) {
      setError('Poll question is required');
      setLoading(false);
      return;
    }

    const validOptions = options.filter(opt => opt.trim());
    if (validOptions.length < 2) {
      setError('At least 2 options are required');
      setLoading(false);
      return;
    }

    if (validOptions.length > 10) {
      setError('Maximum 10 options allowed');
      setLoading(false);
      return;
    }

    try {
      const res = await api.post('/polls', {
        question: question.trim(),
        description: description.trim(),
        options: validOptions
      });
      alert('✓ Poll created successfully!');
      navigate(`/poll/${res.data._id}`);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Unable to create poll';
      setError(errorMsg);
      alert('❌ ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const validOptionsCount = options.filter(opt => opt.trim()).length;

  return (
    <div>
      <h1>🗳️ Create New Poll</h1>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        Create a new poll and let people vote on your questions.
      </p>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #ef4444',
              color: '#991b1b',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="question">
              <strong>📝 Poll Question *</strong>
            </label>
            <input
              id="question"
              type="text"
              placeholder="e.g., What is your favorite programming language?"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              maxLength={200}
              required
            />
            <small style={{ color: '#999', display: 'block', marginTop: '0.25rem' }}>
              {question.length}/200 characters
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="description">
              <strong>📄 Description (Optional)</strong>
            </label>
            <textarea
              id="description"
              placeholder="Add more details about this poll..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={500}
              rows="3"
              style={{ fontFamily: 'inherit', padding: '0.5rem' }}
            />
            <small style={{ color: '#999', display: 'block', marginTop: '0.25rem' }}>
              {description.length}/500 characters
            </small>
          </div>

          <h3 style={{ marginTop: '1.5rem' }}>🎯 Polling Options *</h3>
          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '-0.5rem' }}>
            Add at least 2 options (maximum 10)
          </p>

          {options.map((opt, i) => (
            <div key={i} className="form-group">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <label htmlFor={`option-${i}`} style={{ margin: 0 }}>
                  <strong>Option {i + 1}</strong>
                  {opt.trim() === '' && <span style={{ color: '#f5576c' }}> *</span>}
                </label>
                {options.length > 2 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                    onClick={() => removeOption(i)}
                  >
                    ❌ Remove
                  </button>
                )}
              </div>
              <input
                id={`option-${i}`}
                type="text"
                placeholder={`e.g., Option ${i + 1}`}
                value={opt}
                onChange={e => updateOption(i, e.target.value)}
                maxLength={100}
              />
              <small style={{ color: '#999', display: 'block', marginTop: '0.25rem' }}>
                {opt.length}/100 characters
              </small>
            </div>
          ))}

          <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            <button
              type="button"
              className="btn"
              onClick={addOption}
              style={{
                background: '#f0f0f0',
                color: '#333',
                border: '2px solid #d0d0d0',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                fontWeight: '600'
              }}
              disabled={options.length >= 10}
            >
              ➕ Add Another Option {options.length < 10 ? `(${options.length}/10)` : '(Max)'}
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !question.trim() || validOptionsCount < 2}
            style={{ width: '100%', padding: '1rem', fontSize: '1rem', fontWeight: '600' }}
          >
            {loading ? '⏳ Creating Poll...' : '🎉 Create Poll'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f0fdf4', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#065f46' }}>💡 Tips for Creating Good Polls:</h4>
          <ul style={{ margin: '0', paddingLeft: '1.5rem', color: '#047857', fontSize: '0.9rem' }}>
            <li>Be specific and clear with your question</li>
            <li>Provide diverse and balanced options</li>
            <li>Avoid leading questions</li>
            <li>Keep options mutually exclusive when possible</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreatePollPage;