import { useState, useEffect } from "react";
import AsyncSelect from 'react-select/async';

export default function SearchEmployee({ setEmployeeSelected }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees from the backend API
    const fetchEmployees = async () => {
      try {
        const response = await fetch('admin/GetEmployees');
        const data = await response.json();
        setEmployees(data.Result.map( employee => ({
          label: `${employee.FirstName} ${employee.LastName} - ${employee.Email} - PostOfficeID: ${employee.PostOfficeId}`,
          value: employee,
        })));
        console.log("Effect: ",employees);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
    console.log(employees);
  }, []);

  const filterEmployees = (searchInput) => { // employees -> { label: "stuff", value: {objectStuff} }
    return employees.filter((obj) => 
      obj.value.FirstName.toLowerCase().includes(searchInput.toLowerCase()) ||
      obj.value.LastName.toLowerCase().includes(searchInput.toLowerCase()) ||
      obj.value.Email.toLowerCase().includes(searchInput.toLowerCase()) 
    );
  };

  const promiseOptions = (searchInput) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterEmployees(searchInput));
      }, 1000);
    });

  return (
    (employees && employees.length > 0 && (
      <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} onChange={employee => {
        setEmployeeSelected(employee.value);
        console.log(employee.value);
      }
      } />
    ))
  );

}