import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionList from './TransactionList';
const CustomerPage = () => {
    const [customer, setCustomer] = useState({});
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const customerResponse = await axios.get('/api/customer');
                //Replace /api/customer and /api/transactions with actual API endpoints
                setCustomer(customerResponse.data);

                const transactionsResponse = await axios.get('/api/transactions');
                setTransactions(transactionsResponse.data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCustomerData();
    }, []);
    return (
        <div>
            {/*Display customer information */}
            <h1>{customer.name}</h1>
            <p>{customer.email}</p>

            {/*Display transaction list */}
            <TransactionList transactions={transactions} />
        </div>
    );
};
export default CustomerPage; 

