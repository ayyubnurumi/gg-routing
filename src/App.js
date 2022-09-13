import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import { Dashboard } from './Pages/Dashboard';
import { Login } from './Auth/Login';
import { Registration } from './Auth/Registration';
import { PublicRoute } from './Routes/PublicRoute';
import { ProtectedRoute } from './Routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PublicRoute />} >
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/' element={<Navigate to={'/login'} />} />
        </Route>
        <Route path='/' element={<ProtectedRoute />} >
          <Route index path='/dashboard' element={<Dashboard />} />
          <Route path='/' element={<Navigate to={'/dashboard'} />} />
        </Route>
        <Route path='*' element={<Navigate to={'/dashboard'} replace />} />
      </Routes>
    </Router>
  );
}

export default App;