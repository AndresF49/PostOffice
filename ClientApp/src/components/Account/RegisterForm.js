import { Button, Form, Label, FormGroup } from "reactstrap";
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { Link } from "react-router-dom";

// do not use Input component from reactstrap for form validation with useForm :(

// async function RegisterUser(credentials) {

// 	try {
// 	  const response = await fetch('register/Register', {
// 		method: 'POST',
// 		headers: {
// 		'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({ username: credentials.username, password: credentials.password }) // explicitly state each parameter, both this line and line below work tho >:(
// 		// body: JSON.stringify( credentials )
// 	  });
// 	  // console.log("response: ", response);
  
// 	  const result = await response.json();
// 	  return result;
// 	} catch (error) {
// 	  // console.log("error in loginUser with creds: ", credentials);
// 	  console.log("error: ", error);
// 	}
//   }

// access CustomersArray CustomerArr and add to it when registering, also add to UsersArray -> UserArr as well


export default function RegisterForm() {
	const { register, watch, handleSubmit, formState } = useForm();
	const { errors } = formState
	const [userInfo, setUserInfo] = useState();
	// const watchConfirmPassword = watch("confirmPassword", ''); // you can supply default value as second argument

	

	const onSubmit = (data) => {
		setUserInfo(data)
		console.log(data);
	};

	return (
		<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
			<div className="card border-0 shadow rounded-3 my-5">
				<div className="card-body p-4 p-sm-5">
					<h5 className="card-title text-center mb-5 fw-light fs-2">Register</h5>
					{/* <pre>{JSON.stringify(userInfo, undefined, 2)}</pre> */}
					<Form noValidate onSubmit={ handleSubmit(onSubmit) } >
						<FormGroup floating className="mb-3">
							<input 
								type="text" 
								className="form-control" 
								id="FirstName" 
								placeholder="First name"
								{...register("FirstName", {
									required: {
										value: true,
										message: 'First name is required'
									},
								})}
							/>
							<Label htmlFor="FirstName">
								First name
							</Label>
							<p className="text-danger mt-1">{errors.FirstName?.message}</p>

						</FormGroup>
						<FormGroup floating className="mb-3">
							<input 
								type="text" 
								className="form-control" 
								id="MiddleInitial" 
								placeholder="Middle initial"
								maxLength="1"
								{...register("MiddleInitial", {
									maxLength: 1
								})}
							/>
							<Label htmlFor="MiddleInitial">
								Middle initial
							</Label>
						</FormGroup>
						<FormGroup floating className="mb-3">
							<input 
								type="text" 
								className="form-control" 
								id="LastName" 
								placeholder="Last name"
								{...register("LastName", {
									required: {
										value: true,
										message: 'Last name is required'
									},
								})}
							/>
							<Label htmlFor="LastName">
								Last name
							</Label>
							<p className="text-danger mt-1">{errors.LastName?.message}</p>

						</FormGroup>
						<FormGroup floating className="mb-3">
							<input 
								type="text" 
								className="form-control" 
								id="PhoneNumber" 
								placeholder="Phone number"
								{...register("PhoneNumber")}
							/>
							<Label htmlFor="PhoneNumber">
								Phone Number
							</Label>
						</FormGroup>
						<FormGroup floating className="mb-3">
							<input 
								type="email" 
								className="form-control" 
								id="email" 
								placeholder="name@example.com"
								{...register("Email", {
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
							{...register("Password", {
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
						<FormGroup floating className="mb-3">
							<input 
								type="password" 
								className="form-control" 
								id="confirmPassword" 
								placeholder="Password"
								{...register("ConfirmPassword", {
									required: {
										value: true,
										message: 'Confirm password is required'
									},
									validate: (val) => {
										if (watch('Password') != val) {
										  return "Your passwords do no match";
										}
									}
								})}
							/>
							<Label htmlFor="confirmPassword">
								Confirm password
							</Label>
							<p className="text-danger mt-1">{errors.ConfirmPassword?.message}</p>

						</FormGroup>
						<p className="text-left">Already have an account? <Link to="/login">Login</Link></p>
						<div className="d-grid">
							<Button className="btn-primary btn-login text-uppercase fw-bold" type="submit" >
								Register
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	  );
}