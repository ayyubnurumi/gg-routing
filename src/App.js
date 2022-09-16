import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import { PageLayout } from './Layout/PageLayout';
import { Login } from './Auth/Login';
import { Registration } from './Auth/Registration';
import { PublicRoute } from './Routes/PublicRoute';
import { ProtectedRoute } from './Routes/ProtectedRoute';
import { AuthLayout } from './Auth/AuthLayout';
import { Dashboard } from './Pages/dashboard';
import { Content1 } from './Pages/content1';
import { Content2 } from './Pages/content2';
import { Agreement } from './Auth/Agreement';

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
            <Route path='/content1' element={<Content1 />} />
            <Route path='/content2' element={<Content2 />} />
            <Route path='/' element={<Navigate to={'/dashboard'} replace />} />
          </Route>
        </Route>
        <Route path='*' element={<Navigate to={'/'} replace />} />
      </Routes>
    </Router>
  );
}

export default App;