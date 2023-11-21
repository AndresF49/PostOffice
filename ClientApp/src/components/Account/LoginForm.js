import { Button, Form, Label, FormGroup } from "reactstrap";
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Roles } from "./Roles";

// do not use Input component from reactstrap for form validation with useForm :(

async function loginUser(credentials) {

  try {
    const response = await fetch('login/Login', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }) // explicitly state each parameter, both this line and line below work tho >:(
      // body: JSON.stringify( credentials )
    });
    // console.log("response: ", response);

    const result = await response.json();
    return result;
  } catch (error) {
    // console.log("error in loginUser with creds: ", credentials);
    console.log("error: ", error);
  }
}

// export default function LoginForm({ setToken, setIsAuthenticated, setAuthentication }) {
export default function LoginForm({ setIsAuthenticated, setAuthentication }) {
    const { register, handleSubmit, formState } = useForm();
	const { errors } = formState
  const navigate = useNavigate();

	const onSubmit = async (credentials) => {
		const token = await loginUser(credentials);
		// console.log("Token: ", token);
    // setToken(token);
    setIsAuthenticated(true);
    // setIsAuthenticated({
    //   currentUser: token.user,
    //   role: Roles[token.user.RoleTypeId],
    //   token: token.token
    // });
    setAuthentication({
      currentUser: token.user,
      role: Roles[token.user.RoleTypeId],
      token: token.token
    });
    // console.log("Info below from token=loginUser")
    // console.log(`User: ${token.user}`);
    // console.log(`Role: ${Roles[token.user.RoleTypeId]}`);
    // console.log(`Token: ${token.token}`);
    navigate("/");
	};

	return (
		<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
			<div className="card border-0 shadow rounded-3 my-5">
				<div className="card-body p-4 p-sm-5">
					<h5 className="card-title text-center mb-5 fw-light fs-2">Login</h5>
					<Form noValidate onSubmit={ handleSubmit(onSubmit) } >
						<FormGroup floating className="mb-3">
							<input 
								type="email" 
								className="form-control" 
								id="email" 
								placeholder="name@example.com"
								{...register("email", {
									required: {
										value: true,
										message: 'Email is required'
									},
									pattern: {
										value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
										message: 'Invalid email format'
									}
								})}
							/>
							<Label htmlFor="email">
								Email address
							</Label>
							<p className="text-danger mt-1">{errors.Email?.message}</p>

						</FormGroup>
						<FormGroup floating className="mb-3">
							<input 
								type="password" 
								className="form-control" 
								id="password" 
								placeholder="Password"
								{...register("password", {
									required: {
										value: true,
										message: 'Password is required'
									},
								})}
							/>
							<Label htmlFor="password">
								Password
							</Label>
							<p className="text-danger mt-1">{errors.Password?.message}</p>

						</FormGroup>
						<div className="d-grid gap-3">
							<Button className="btn-primary btn-login text-uppercase fw-bold" type="submit" >
								Login
							</Button>
							<Link className="btn btn-primary btn-login text-uppercase fw-bold" to="/register" role="button">Register</Link>
						</div>
					</Form>
				</div>
			</div>
		</div>
	  );
}