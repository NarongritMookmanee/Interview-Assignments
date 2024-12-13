import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import EditUserPage from './pages/EditUser/EditUserPage';
import RegisterPage from './pages/Register/RegisterPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/edituser" element={<EditUserPage />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
