import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './CSS/App.css';

import Home from './Views/Home';
import Register from './Views/Register';
import Login from './Views/Login';
import Profile from './Views/Profile';
import Dashboard from './Views/Dashboard';
import Search from './Views/Search';

// import ProtectedRoute from './Components/ProtectedRoute';
// import Navigation from './Components/Navigation';




function App() {

  return (
    <div className="wrapper">
      {/* <Navigation></Navigation> */}
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/search" element={<Search />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
