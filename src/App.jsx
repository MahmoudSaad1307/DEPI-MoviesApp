// App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import UserPage from './UserPage';
import Actor from './Actor';

const App = () => {
  return (
    <div>
      {/* Simple Navbar */}
      <nav className="p-3 bg-dark text-white">
        <Link className="me-3 text-white" to="/">Home</Link>
        <Link className="me-3 text-white" to="/user">User</Link>
        <Link className="me-3 text-white" to="/actor">Actor</Link>
      </nav>

      <div className="p-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/actor" element={<Actor />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
