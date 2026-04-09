import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CreatePollPage from './pages/CreatePollPage';
import PollDetailPage from './pages/PollDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/poll/:id" element={<PollDetailPage />} />
              
              {/* Protected Routes */}
              <Route path="/create" element={
                <ProtectedRoute>
                  <CreatePollPage />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
            </Routes>
          </main>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
