import Home from './pages/Home.jsx'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Login from './pages/Login.jsx';
import { useAuthContext } from './hooks/useAuth.Context.js';

function App() {

  const {user, token} = useAuthContext()

  return (
    <Router>
      <Routes>
        <Route path='/' element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={!token ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;