/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const EditEmployee = () => {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState({
    });

    useEffect(() => {
        const fetchEmployeeById = async () => {
            try {
                // Make a request to your server endpoint to fetch employee data based on employeeId
                const response = await fetch(`employees/${employeeId}`); // Replace with the correct endpoint <3

                if (response.ok) {
                    const data = await response.json();
                    setEmployee(data);
                } else {
                    console.error('Failed to fetch employee data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeById();
    }, [employeeId]); // The effect will re-run whenever the employeeId changes


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`/employees/${employee.id}`, { //need to put the correct endpoint T.T
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee),
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
        <div>
            <h2>Edit Employee</h2>
            <Form>
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={employee.firstName}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={employee.lastName}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={employee.email}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={employee.phone}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="EmployeeId">Department</Label>
                    <Input
                        type="numbers"
                        name="employeeId"
                        id="employeeId"
                        value={employee.employeeId}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <Button color="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Form>
        </div>
    );
};

export default EditEmployee;