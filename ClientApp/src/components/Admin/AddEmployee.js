import { Button, Form, Label, FormGroup, Col, Row } from "reactstrap";
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Roles } from "../Account/Roles";
import { CreateUser } from "../Account/RegisterForm";

export default function AddEmployee({ authentication })  {

  const { register, watch, handleSubmit, formState } = useForm();
  const { errors } = formState
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState(null);
  const [createUserError, setCreateUserError] = useState(null);

  async function CreateEmployee(credentials) {
    try {
      const response = await fetch('register/CreateEmployee', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          AdminUserId: credentials.AdminUserId,
          Ssn: credentials.Ssn,
          FirstName: credentials.FirstName,
          MiddleInitial: credentials.MiddleInitial ? credentials.MiddleInitial : null,
          LastName: credentials.LastName,
          PhoneNumber: credentials.PhoneNumber ? credentials.PhoneNumber : null,
          Email: credentials.Email,
          RoleTypeId: credentials.RoleTypeId,
          Salary: credentials.Salary,
          DateOfBirth: credentials.DateOfBirth,
          StartDate: credentials.StartDate,
          UserId: credentials.UserId,
        }) // explicitly state each parameter, both this line and line below work tho >:(
        // body: JSON.stringify( credentials )
      });
      // console.log("response: ", response);
      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          console.log("Error 400 received when creating Customer: " , errorData.errors);
          return false;
        } else {
          console.error('Error during customer creation:', response.statusText);
          return false;
        } 
        
      } else {
        console.log('Customer creation successfull');
        const result = await response.json();
        return result;
      }
    } catch (error) {
      console.log("Error when creating Customer: ", error);
    }
  }

  const validateDateTime = (value) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();

    if (selectedDate >= currentDate) {
      return 'Please select a date and time before the current date and time.';
    }

    return true;
  };


  const onSubmit = async (credentials) => {
    // const currentDate = new Date();

    // const year = currentDate.getFullYear();
    // const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
    // const day = currentDate.getDate().toString().padStart(2, '0');
    // const formattedDate = `${year}${month}${day}`;

    // credentials.DateOfBirth = credentials.DateOfBirth.replace(/-/g, '');
    // credentials.StartDate = formattedDate;
    credentials.StartDate = new Date();
    credentials.AdminUserId = parseInt(authentication.currentUser.UserId);
    // console.log(credentials);
    // return;
    
    // create a user, get the created UserId from db/backend
    // add UserId to the credentials object that we pass to CreateCustomer
    const createUserObjId = await CreateUser(credentials, credentials.RoleTypeId, setCreateUserError);
    // const createUserObjId = await CreateUser()
    if (createUserObjId == false) {
      return false;
    }
    credentials.UserId = createUserObjId;
    // credentials.StartDate = new Date();

    const authDetails = await CreateEmployee(credentials);
    console.log(authDetails);
    if (authDetails == false) {
      return false;
    }
    // console.log("Info below from token=loginUser")
    // console.log(`User: ${token.user}`);
    // console.log(`Role: ${[token.user.RoleType]}`);
    // console.log(`Token: ${token.token}`);
    // navigate("/");
  };

  return (
    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <div className="card border-0 shadow rounded-3 my-5">
        <div className="card-body p-4 p-sm-5">
          <h5 className="card-title text-center mb-5 fw-light fs-2">Create an Employee</h5>
          <Form noValidate onSubmit={ handleSubmit(onSubmit) } >
            <Row>
              <Col>
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
                    First name<span className="text-danger">*</span>
                  </Label>
                  <p className="text-danger mt-1">{errors.FirstName?.message}</p>
                </FormGroup>
              </Col>
              <Col md={4}>
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
              </Col>
            </Row>
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
                Last name<span className="text-danger">*</span>
              </Label>
              <p className="text-danger mt-1">{errors.LastName?.message}</p>
            </FormGroup>
            <FormGroup floating className="mb-3">
              <input 
                type="text" 
                className="form-control" 
                id="Ssn" 
                placeholder="Social Security Number"
                {...register("Ssn", {
                  required: {
                    value: true,
                    message: 'Social Security Number is Required'
                  },
                  pattern: {
                    value: /^\d{9}$/,
                    message: 'Please enter a valid 9 digit SSN ~ 555555555'
                  }
                })}
              />
              <Label htmlFor="LastName">
                Social Security Number<span className="text-danger">*</span>
              </Label>
              <p className="text-danger mt-1">{errors.Ssn?.message}</p>
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
                id="Email" 
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
              <Label htmlFor="Email">
                Email address<span className="text-danger">*</span>
              </Label>
              <p className="text-danger mt-1">{errors.Email?.message}</p>

            </FormGroup>
            <FormGroup floating className="mb-3">
              <select className="form-select" id="RoleTypeId"
                defaultValue={2}
                {...register("RoleTypeId")}>
                <option value={2}>Employee</option>
                <option value={1}>Admin</option>
              </select>
              <Label htmlFor="RoleTypeId">
                Role Type
              </Label>
					  </FormGroup>
            <FormGroup floating className="mb-3">
              <input 
                type="text" 
                className="form-control" 
                id="Salary" 
                placeholder="40000"
                {...register("Salary", {
                  required: {
                    value: true,
                    message: 'Salary is required'
                  },
                  pattern: {
                    value: /^\d*(\.{1}\d{2})?$/,
                    message: 'Please enter a valid salary ~ 999.99',
                  }
                  })}
              />
              <Label htmlFor="Salary">
                Salary<span className="text-danger">*</span>
              </Label>
              <p className="text-danger mt-1">{errors.Salary?.message}</p>
            </FormGroup>
            <FormGroup floating className="mb-3">
              <input 
                type="date" 
                className="form-control" 
                id="DateOfBirth" 
                placeholder="DateOfBirth"
                {...register("DateOfBirth", {
                  required: 'This field is required',
                  validate: validateDateTime,
                })}
              />
              <Label htmlFor="DateOfBirth">
                Date of birth<span className="text-danger">*</span>
              </Label>
              <p className="text-danger mt-1">{errors.DateOfBirth?.message}</p>

            </FormGroup>
            <FormGroup floating className="mb-3">
              <input 
                type="text" 
                className="form-control" 
                id="Username" 
                placeholder="Username"
                {...register("Username", {
                  required: {
                    value: true,
                    message: 'Username is required'
                  }
                })}
              />
              <Label htmlFor="Username">
                Username<span className="text-danger">*</span>
              </Label>
              <p className="text-danger mt-1">{errors.Username?.message}</p>

            </FormGroup>
            <FormGroup floating className="mb-3">
            <input 
              type="password" 
              className="form-control" 
              id="Password" 
              placeholder="Password"
              {...register("Password", {
                required: {
                  value: true,
                  message: 'Password is required'
                },
              })}
            />
            <Label htmlFor="Password">
              Password<span className="text-danger">*</span>
            </Label>
            <p className="text-danger mt-1">{errors.Password?.message}</p>

            </FormGroup>
            <FormGroup floating className="mb-3">
              <input 
                type="password" 
                className="form-control" 
                id="ConfirmPassword" 
                placeholder="Password"
                {...register("ConfirmPassword", {
                  required: {
                    value: true,
                    message: 'Confirm password is required'
                  },
                  validate: (val) => {
                    if (watch('Password') !== val) {
                      return "Your passwords do no match";
                    }
                  }
                })}
              />
              <Label htmlFor="ConfirmPassword">
                Confirm password<span className="text-danger">*</span>
              </Label>
              <p className="text-danger mt-1">{errors.ConfirmPassword?.message}</p>

            </FormGroup>
            {/* <p className="text-left">Already have an account? <Link to="/login">Login</Link></p> */}
            <p className="text-danger">{createUserError}</p>
            <div className="d-grid">
              {/* <p */}
              <Button className="btn-primary btn-login text-uppercase fw-bold" type="submit" >
                Register Employee
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}



//   return (
//     <>
//       <h3>Add employee</h3>
//     </>
//   );
// }