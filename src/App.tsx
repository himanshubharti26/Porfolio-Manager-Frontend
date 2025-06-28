import React, { useEffect } from 'react';
import './App.css';
import { AppDispatch } from './redux/store';
import { useDispatch } from 'react-redux';
import { fetchUser } from './redux/slices/userSlice';
import AppRoutes from './routes/AppRoutes';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
