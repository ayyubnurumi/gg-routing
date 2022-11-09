import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';

import { PageLayout } from './Layout/PageLayout';
import { Login } from './Auth/Login';
import { Registration } from './Auth/Registration';
import { PublicRoute } from './Routes/PublicRoute';
import { ProtectedRoute } from './Routes/ProtectedRoute';
import { AuthLayout } from './Auth/AuthLayout';
import { Dashboard } from './Pages/dashboard';
import { About } from './Pages/about';
import { Agreement } from './Auth/Agreement';
import { Profile } from './Pages/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PublicRoute />} >
          <Route path='/' element={<AuthLayout />} >
            <Route index path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/agreement' element={<Agreement />} />
            <Route path='/' element={<Navigate to={'/login'} replace />} />
          </Route>
        </Route>
        <Route path='/' element={<ProtectedRoute />} >
          <Route path='/' element={<PageLayout />} >
            <Route index path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/about' element={<About />} />
            <Route path='/' element={<Navigate to={'/dashboard'} replace />} />
          </Route>
        </Route>
        <Route path='*' element={<Navigate to={'/'} replace />} />
      </Routes>
    </Router>
  );
}

export default App;