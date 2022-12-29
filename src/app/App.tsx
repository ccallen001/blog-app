import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from '../routes/Home';
import Blogs from '../routes/Blogs';
import Users from '../routes/Users';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/users">Users</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
