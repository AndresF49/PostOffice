import React, { Component } from 'react';
import LoginForm from './LoginForm';

export default function Login({ setToken, setIsAuthenticated }) {

        return (
            <>
                <LoginForm setToken={setToken} setIsAuthenticated={setIsAuthenticated} />
            </>
        );
    // }
}
