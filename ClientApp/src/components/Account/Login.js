import React, { Component } from 'react';
import LoginForm from './LoginForm';

export default function Login({ setIsAuthenticated, setAuthentication }) {

        return (
            <>
                <LoginForm setIsAuthenticated={setIsAuthenticated} setAuthentication={setAuthentication} />
            </>
        );
}
