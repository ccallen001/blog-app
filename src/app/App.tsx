import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from '../routes/Home';
import Login from '../routes/Login';
import Users from '../routes/Users';
import Blogs from '../routes/Blogs';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/users">Users</Link>
          <Link to="/blogs">Blogs</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
