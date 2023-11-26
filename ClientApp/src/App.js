import React from 'react';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout';
import './custom.css';
import Login from "./components/Account/Login";
import Register from './components/Account/Register';
import { Roles } from './components/Account/Roles';
import ErrorPage from './components/ErrorPage';
import { useState } from 'react';
import { useEffect } from 'react';
import useAuthentication from './components/Utils/useAuthentication';
import Home from './components/Home';
import AdminPage from './components/Admin/AdminPage';
import EmployeePage from './components/Employee/EmployeePage';
import Packages from './components/Package/Packages';
import PackagesPage from './components/Package/PackagesPage';
import TransactionsPage from './components/Transactions/TransactionsPage';
import EditEmployee from './components/Admin/EditEmployee';


export default function App() {

  const {authentication, setAuthentication} = useAuthentication(null); // authentication holds
  // currentUser Obj, Role, and Token
  // pass this to each page as needed
  
  useEffect(() => {
    if (authentication != null) {
      // console.log(`authentication is: ${authentication != null} with role as ${authentication.role}`);
    }
    else {
      console.log(`authentication is NULL`);
    }
  }, [authentication]);

  const notAuthenticatedRoutes = () => {
    return (
    <Routes>
      <Route path={"/login"} index element={ <Login setAuthentication={setAuthentication} /> } />
      <Route path={"/register"} element={ <Register setAuthentication={setAuthentication}/> } />
      <Route path={"*"} element={ <Navigate to="/login" replace /> } />
    </Routes>
    );
  }

  const adminRoutes = () => {
    return (
      <Routes>
        <Route index path='/' element={ <AdminPage authentication={authentication} /> } />
        <Route index path='/packages' element={ <PackagesPage authentication={authentication} /> } />
        <Route path='/employee' element={ <EditEmployee authentication={authentication}/> } /> 
        <Route path='/transactions' element={ <TransactionsPage authentication={authentication} />} />
        <Route path='*' element={ <Navigate to="/" replace /> } />
      </Routes>
    );
  }

  const employeeRoutes = () => {
    return (
      <Routes>
        <Route index path='/' element={ <PackagesPage authentication={authentication} /> } />
        <Route path='/employee' element={ <EmployeePage authentication={authentication} /> } /> 
        <Route path='/transactions' element={ <TransactionsPage authentication={authentication} /> } />
        <Route path='*' element={ <Navigate to="/" replace /> } />
      </Routes>
    );
  }

  const customerRoutes = () => {
    return (
      <Routes>
        <Route index path='/' element={ <PackagesPage authentication={authentication} /> } />
        <Route path='/transactions' element={ <TransactionsPage authentication={authentication} /> } />
        <Route path='*' element={ <Navigate to="/" replace /> } />
      </Routes>
    );
  }

  return (
    (authentication != null ? 
      <Layout setAuthentication={setAuthentication} authentication={authentication}>
        { authentication.role === Roles[1] && adminRoutes() } {/* admin */}
        { authentication.role === Roles[2] && employeeRoutes() } {/* employee */}
        { authentication.role === Roles[3] && customerRoutes() } {/* customer */}
      </Layout> 
      :
      notAuthenticatedRoutes()
    )
  );
}
