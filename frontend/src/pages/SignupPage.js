import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import DemoCredentials from '../components/DemoCredentials';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: contextLogin } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      await api.post('/auth/signup', { name, email, password, role });
      alert('Account created successfully! Logging you in...');
      
      // Auto-login after signup
      const loginRes = await api.post('/auth/login', { email, password });
      contextLogin(loginRes.data.user, loginRes.data.token);
      navigate('/');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Signup failed';
      setError(errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Your Account</h1>

      <div className="form-container">
        <form onSubmit={handleSignup}>
          {error && <div style={{ color: '#f5576c', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password (min 6 characters)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Account Type</label>
            <select
              id="role"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="user">Regular User (Voter)</option>
              <option value="admin">Administrator (Create Polls)</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-3">
          <p>Already have an account? <Link to="/login" style={{ color: '#667eea', fontWeight: '600' }}>Login</Link></p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DemoCredentials />
      </div>
    </div>
  );
};

export default SignupPage;