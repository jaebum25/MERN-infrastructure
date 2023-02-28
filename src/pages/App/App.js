import './App.css';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(getUser);

  return (
    <main className="App">
      <h1>hello everyone!</h1>
      { user ?
        <>
          <NavBar user={user} setUser={setUser} /> 
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/*" element={<Navigate to="/orders" />} />
          </Routes>
        </>
        : 
        <AuthPage setUser={setUser} /> }
    </main>
  );
}
