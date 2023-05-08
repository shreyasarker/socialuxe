import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
