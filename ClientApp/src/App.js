import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout';
import './custom.css';
import useToken from './components/Utils/useToken';
import Login from "./components/Account/Login";
import { Register } from './components/Account/Register';
import ErrorPage from './components/ErrorPage';
import { useState } from 'react';
import { useEffect } from 'react';


export default function App() {

  const { token, setToken } = useToken();
  const [isAuthenticated, setIsAuthenticated] = useState(); // if we default useState(false), for some reason
  // whenever we go to searchPackage and press 'enter', isAuthenticated gets set to false...
  // so keep it empty for now and let login/logout control the state of this

  useEffect(() => {
    console.log("isAuthenticated now: " + isAuthenticated);
  }, [isAuthenticated]);

  // if(!token) {
  //   return (
  //     (!isAuthenticated && 
  //     <Routes>
  //       <Route key={0} index={true} path={"/login"} element={<Login setToken={setToken} setIsAuthenticated={setIsAuthenticated} />} errorElement={<ErrorPage />} />
  //       <Route key={1} path={"/register"} element={<Register />} errorElement={<ErrorPage />}/>
  //       <Route key={2} path={"*"} element={<Navigate to="/login" />} errorElement={<ErrorPage />}/>
  //     </Routes>
  //     )
  //   );
  // }

  const notAuthenticatedRoutes = () => {
    return (
    <Routes>
      <Route key={0} index={true} path={"/login"} element={<Login setToken={setToken} setIsAuthenticated={setIsAuthenticated} />} errorElement={<ErrorPage />} />
      <Route key={1} path={"/register"} element={<Register />} errorElement={<ErrorPage />}/>
      <Route key={2} path={"*"} element={<Navigate to="/login" />} errorElement={<ErrorPage />}/>
    </Routes>
    );
  }

  return (
    (isAuthenticated ? 
      <Layout setIsAuthenticated={setIsAuthenticated}>
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
