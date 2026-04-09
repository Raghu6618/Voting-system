import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import DemoCredentials from '../components/DemoCredentials';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: contextLogin } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      contextLogin(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Login failed';
      setError(errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login to Your Account</h1>

      <div className="form-container">
        <form onSubmit={handleLogin}>
          {error && <div style={{ color: '#f5576c', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
          
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
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-3">
          <p>Don't have an account? <Link to="/signup" style={{ color: '#667eea', fontWeight: '600' }}>Sign up</Link></p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DemoCredentials />
      </div>
    </div>
  );
};

export default LoginPage;