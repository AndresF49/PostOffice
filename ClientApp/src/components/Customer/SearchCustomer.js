import { useState, useEffect } from "react";
import AsyncSelect from 'react-select/async';

export default function SearchCustomer({ setCustomerSelected }) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customers from the backend API
    const fetchCustomers = async () => {
      try {
        const response = await fetch('customer/GetCustomers');
        const data = await response.json();
        setCustomers(data.Result.map( cust => ({
          label: `${cust.FirstName} ${cust.LastName} - ${cust.Email}`,
          value: cust,
        })));
        console.log("Effect: ",customers);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomers();
    console.log(customers);
  }, []);

  const filterCustomers = (searchInput) => { // customers -> { label: "stuff", value: {objectStuff} }
    return customers.filter((obj) => 
      obj.value.FirstName.toLowerCase().includes(searchInput.toLowerCase()) ||
      obj.value.LastName.toLowerCase().includes(searchInput.toLowerCase()) ||
      obj.value.Email.toLowerCase().includes(searchInput.toLowerCase()) 
    );
  };

  const promiseOptions = (searchInput) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterCustomers(searchInput));
      }, 1000);
    });

  return (
    (customers && customers.length > 0 && (
      <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} onChange={customer => setCustomerSelected(customer)} />
    ))
  );

}