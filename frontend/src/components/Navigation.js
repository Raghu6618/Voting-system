import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navigation = () => {
  const { isAuthenticated, isAdmin, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <div className="nav-container">
        <Link to="/" className="nav-brand">🗳️ Voting System</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {isAuthenticated ? (
            <>
              <span style={{ color: '#999', fontSize: '0.9rem' }}>👤 {user?.name}</span>
              {isAdmin && <Link to="/create">➕ Create Poll</Link>}
              {isAdmin && <Link to="/admin">📊 Admin Panel</Link>}
              <button 
                onClick={handleLogout}
                className="btn-logout"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f5576c',
                  cursor: 'pointer',
                  fontWeight: '600',
                  textDecoration: 'underline'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;