import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import { Dashboard } from './Pages/Dashboard';
import { Login } from './Auth/Login';
import { Registration } from './Auth/Registration';

function App() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </Route>
        <Route>
          <Route path='/' element={<Dashboard />} />
        </Route>
        <Route path='*' element={<Navigate to={'/'} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
