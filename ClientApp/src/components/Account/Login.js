import React, { Component } from 'react';
import LoginForm from './LoginForm';

export default function Login({ setToken }) {

        return (
            <>
                <LoginForm setToken={setToken}/>
            </>
        );
    // }
}
