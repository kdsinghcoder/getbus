import React, { createContext, useReducer } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import HyperNavbar from './components/HyperNavbar';
import Home from './pages/Home';
import Findbuss from './pages/Findbuss';
import Transaction from './pages/Transaction';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout'
import  Admin from "./pages/Admin.js"
import { initialState, reducer } from './reducer/UseReducer';
export const UserContext = createContext();


function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
      {location.pathname === '/admin' ? null : <HyperNavbar />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="findbuss" element={<Findbuss />} />
          <Route exact path="transaction" element={<Transaction />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="signup" element={<Signup />} />
          <Route exact path="logout" element={<Logout />} />
          <Route exact path="admin" element={<Admin />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
