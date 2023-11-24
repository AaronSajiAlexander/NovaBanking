import React from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Help from './Components/Help';
import TransactionLog from './Components/TransactionLog';
import Withdraw from './Components/Withdraw';
import Deposit from './Components/Deposit';
import About from './Components/About';
import Add from './Components/Add';
import { AuthProvider, useIsLoggedIn } from './Components/AuthContext';
import Transfer from './Components/Transfer';
import SignOut from './Components/SignOut';

function App() {
  const isLoggedIn = useIsLoggedIn();
  return (
  
    <AuthProvider>
      <Routes>
        {<Route path="/home" element={<Home />} />}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/help" element={<Help />} />
        <Route path="/home/transaction-log" element={<TransactionLog />} />
        <Route path="/home/withdraw" element={<Withdraw />} />
        <Route path="/home/deposit" element={<Deposit />} />
        <Route path="/home/add" element={<Add />} />
        <Route path="/home/transfer" element={<Transfer />} />
        <Route path="/about" element={<About />} />
        <Route path="/signout" element={<SignOut />} />
         {<Route
             path="/"
             render={() => (
               isLoggedIn ? (
                 <Navigate to="/home" />
               ) : (
                 <Navigate to="/" />
               )
             )}
           /> }
      </Routes>
    </AuthProvider>
  );
}

export default App;
