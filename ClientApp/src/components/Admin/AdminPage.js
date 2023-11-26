import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'reactstrap';

const AdminPage = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('/api/employees'); //the endpoints are not correct
                if (response.ok) {
                    const data = await response.json();
                    setEmployees(data);
                } else {
                    console.error('Failed to fetch employee list:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching employee list:', error);
            }
        };

        fetchEmployees();
    }, []);
   
    return (
        <div>
            <h1>Admin Page</h1>
            <Link to="/admin/create-employee">
                <Button color="primary">Create Employee</Button>
            </Link>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <Link to={`/Admin/EditEmployee/${employee.id}`}> 
                                    <Button color="info">Edit</Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminPage;