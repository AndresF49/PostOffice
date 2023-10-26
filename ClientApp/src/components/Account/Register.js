import React, { Component } from 'react';
import RegisterForm from './RegisterForm';

export class Register extends Component {
    static displayName = Register.name;

    // const { register } = useForm();

    // lets do some validation on the fields too!
    // we may be able to do input fields as reusable components
    render() {
        return (
            <>
                <RegisterForm />
            </>
        );
    }
}
