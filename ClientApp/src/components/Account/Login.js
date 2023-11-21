import React, { Component } from 'react';
import LoginForm from './LoginForm';

// export default function Login({ setToken, setIsAuthenticated, setAuthentication }) {
export default function Login({ setIsAuthenticated, setAuthentication }) {


        return (
            <>
                {/* <LoginForm setToken={setToken} setIsAuthenticated={setIsAuthenticated} setAuthentication={setAuthentication} /> */}
                <LoginForm setIsAuthenticated={setIsAuthenticated} setAuthentication={setAuthentication} />
            </>
        );
    // }
}
