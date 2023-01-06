import React from 'react';

interface Props {
    title: string;
    amount: number;
    price: number;
}

const OrderCard: React.FC<Props> = ({ title, amount, price }) => {

    return (
        <div className='my-4'>
            <span>{title}</span>
            <span className='mx-5'>x {amount}</span>
            <b className='mx-5'>{price}</b>
            <button className='btn btn-success'>Delete</button>
        </div>
    );
};

export default OrderCard;