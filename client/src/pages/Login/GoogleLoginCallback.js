import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleGoogleLogin } from '../../components/redux/apiCall'; // Đảm bảo đường dẫn chính xác

const GoogleLoginCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userString = params.get('user');
    if (userString) {
      const user = JSON.parse(decodeURIComponent(userString));
      dispatch(handleGoogleLogin(user));
      navigate('/');
    }
  }, [location, dispatch, navigate]);

  return <div>Processing login...</div>;
};

export default GoogleLoginCallback;