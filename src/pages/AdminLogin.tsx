import AdminAuth from '@/components/AdminAuth';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  };

  return <AdminAuth onLogin={handleLogin} />;
};

export default AdminLogin;
