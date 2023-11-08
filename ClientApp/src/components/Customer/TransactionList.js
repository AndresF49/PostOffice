import React from 'react';
import TransactionItem from './TransationItem';

const TransactionList = ({ transactions }) => {
    return (
        <ul>
            {transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
        </ul>
    );
}
export default TransactionList;