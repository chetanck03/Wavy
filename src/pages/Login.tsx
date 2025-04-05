
import React, { useEffect } from 'react';
import { LoginForm, useAuth } from '@/components/UserAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);
  
  const handleLoginSuccess = () => {
    navigate('/');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-t-solar-blue rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SolarWave</h1>
          <p className="text-gray-600">Log in to monitor your solar energy system</p>
        </div>
        
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
};

export default Login;
