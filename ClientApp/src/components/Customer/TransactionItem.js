import React from 'react';

const TransactionItem = ({ transaction }) => {
    return (<li>
        <p> Date: {transaction.date}</p>
        <p>Amount: ${transaction.amount}</p>
    </li>
    );
};
export default TransactionItem;