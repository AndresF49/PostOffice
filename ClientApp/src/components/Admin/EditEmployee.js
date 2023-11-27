/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import SearchEmployee from '../Employee/SearchEmployee';

const EditEmployee = () => {
    const [employeeSelected, setEmployeeSelected] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeSelected({
          ...employeeSelected,
          [name]: value,
        });
      };

    const handleSaveChanges = async () => {
        // console.log(employeeSelected)
        // return;
        try {
            const response = await fetch(`/admin/UpdateEmployee`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Employee: employeeSelected
                }),
            });

            if (response.ok) {
                // If the update is successful, fetch the updated data again
                fetchEmployeeById();
                history.push('/admin');
            } else {
                // Handle errors if the update is not successful
                console.error('Failed to save changes:', response.statusText);
            }
        } catch (error) {
            // Handle errors during the save operation
            console.error('Error saving changes:', error);
        }
    };

    return (
        <div className='mb-5'>
            <h2>Edit Employee</h2>
            <SearchEmployee setEmployeeSelected={setEmployeeSelected} />
            <br></br>

            {employeeSelected && 
            <Form>
                <FormGroup>
                    <Label for="Ssn">Social Security Number</Label>
                    <Input
                        type="text"
                        name="Ssn"
                        id="Ssn"
                        // placeholder={employeeSelected.Ssn}
                        value={employeeSelected.Ssn}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={employeeSelected.FirstName}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Middle initial</Label>
                    <Input
                        type="text"
                        name="MiddleInitial"
                        id="MiddleInitial"
                        value={employeeSelected.MiddleInitial}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={employeeSelected.LastName}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={employeeSelected.Email}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={employeeSelected.PhoneNumber}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup floating className="mb-3">
                <select className="form-select" id="RoleTypeId"
                    value={employeeSelected.RoleTypeId}
                    >
                    <option value={2}>Employee</option>
                    <option value={1}>Admin</option>
                </select>
                <Label htmlFor="RoleTypeId">
                    Role Type
                </Label>
                </FormGroup>
                <FormGroup>
                    <Label for="Salary">Salary</Label>
                    <Input
                        type="numbers"
                        name="Salary"
                        id="Salary"
                        value={employeeSelected.Salary}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="DOB">Date of Birth</Label>
                    <Input
                        type="date"
                        name="DateOfBirth"
                        id="DOB"
                        value={employeeSelected.DateOfBirth}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="SD">Employment Start Date</Label>
                    <Input
                        type="date"
                        name="Start date"
                        id="SD"
                        value={employeeSelected.StartDate}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="PostOfficeId">Post Office Id</Label>
                    <Input
                        type="number"
                        name="PostOfficeId"
                        id="PostOfficeId"
                        value={employeeSelected.PostOfficeId}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="PostMasterId">Post Master Id</Label>
                    <Input
                        type="number"
                        name="PostMasterId"
                        id="PostMasterId"
                        value={employeeSelected.PostMasterId}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <Button color="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Form>
            }
        </div>
    );
};

export default EditEmployee;