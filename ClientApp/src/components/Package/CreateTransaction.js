import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const CreateTransaction = ({ package: sourcePackage, onClose }) => {
    const [transactionDetails, setTransactionDetails] = useState({
        totalPrice: 0,
        TransactionDate: '', 
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTransactionDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleCreateTransaction = async () => {
        try {
            const response = await fetch('Package/CreateTransaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    transactionDetails,
                    sourcePackage,
                }),
            });

            if (response.ok) {
                console.log('Transaction created successfully');

                onClose();
            } else {
                console.error('Failed to create transaction:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating transaction:', error);
        }
  
    };

    return (
        <div>
            <h2>Create Transaction</h2>
            <Form>
                <FormGroup>
                    <Label for="totalPrice">Total Price</Label>
                    <Input
                        type="number"
                        name="totalPrice"
                        id="totalPrice"
                        value={transactionDetails.totalPrice}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="transactionDate">Transaction Date</Label>
                    <Input
                        type="date" 
                        name="transactionDate"
                        id="transactionDate"
                        value={transactionDetails.transactionDate}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <Button color="success" onClick={handleCreateTransaction}>
                    Create Transaction
                </Button>
            </Form>
        </div>
    );
};

export default CreateTransaction;