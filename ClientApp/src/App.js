import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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


export default function App() {

  const {authentication, setAuthentication} = useAuthentication(null); // authentication holds
  // currentUser Obj, Role, and Token
  // pass this to each page as needed
  
  useEffect(() => {
    if (authentication != null) {
      console.log(`authentication is: ${authentication != null} with role as ${authentication.role}`);
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
      <>
        <Route path='/employee' element={ <EmployeePage authentication={authentication} /> } /> 
        <Route path='/admin' element={ <AdminPage authentication={authentication} /> } />
      </>
    );
  }

  const employeeRoutes = () => {
    return (
      <>
        <Route path='/employee' element={ <EmployeePage authentication={authentication} /> } /> 
      </>
    );
  }

  return (
    (authentication != null ? 
      <Layout setAuthentication={setAuthentication} authentication={authentication}>
        <Routes>
          <Route index path='/' element={ <Packages authentication={authentication} /> } />
          { authentication.role === Roles[0] && adminRoutes() } {/* admin */}
          { authentication.role === Roles[1] && employeeRoutes() } {/* employee */}
          <Route path='*' element={ <Navigate to="/" replace /> } />
          
          {/* {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })} */}
        </Routes>
      </Layout> 
      :
      notAuthenticatedRoutes()
    )
  );
}
