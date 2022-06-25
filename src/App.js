import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './Views/Home';
import Register from './Views/Register';
import Login from './Views/Login';
import Profile from './Views/Profile';
import Dashboard from './Views/Dashboard';
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
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
