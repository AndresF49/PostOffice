import React, { Component } from 'react';
import LoginForm from './LoginForm';

export class Login extends Component {
    static displayName = Login.name;

    // const { register } = useForm();

    // lets do some validation on the fields too!
    // we may be able to do input fields as reusable components
    render() {
        return (
            <>
                <LoginForm />
            </>
        );
    }
}
