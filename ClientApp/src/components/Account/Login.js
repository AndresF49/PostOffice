import LoginForm from './LoginForm';

export default function Login({ setAuthentication }) {

  return (
    <>
      <LoginForm setAuthentication={setAuthentication} />
    </>
  );
}
