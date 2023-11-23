import React from 'react';
import RegisterForm from './RegisterForm';

export default function Register({ setAuthentication }) {

  return (
    <>
      <RegisterForm setAuthentication={setAuthentication} />
    </>
  );
}
