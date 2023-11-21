import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout';
import './custom.css';
import Login from "./components/Account/Login";
import { Register } from './components/Account/Register';
import ErrorPage from './components/ErrorPage';
import { useState } from 'react';
import { useEffect } from 'react';
import useAuthentication from './components/Utils/useAuthentication';


export default function App() {

  const {authentication, setAuthentication} = useAuthentication(null); // authentication holds
  // currentUser Obj, Role, and Token
  // pass this to each page as needed
  
  useEffect(() => {
    console.log(`authentication is: ${authentication != null}`);
  }, [authentication]);

  const notAuthenticatedRoutes = () => {
    return (
    <Routes>
      <Route key={0} index path={"/login"} element={<Login setAuthentication={setAuthentication} />} errorElement={<ErrorPage />} />
      <Route key={1} path={"/register"} element={<Register />} errorElement={<ErrorPage />}/>
      <Route key={2} path={"*"} element={<Navigate to="/login" replace />} errorElement={<ErrorPage />}/>
    </Routes>
    );
  }

  return (
    (authentication != null ? 
      <Layout setAuthentication={setAuthentication}>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout> 
      :
      notAuthenticatedRoutes()
    )
  );
}
