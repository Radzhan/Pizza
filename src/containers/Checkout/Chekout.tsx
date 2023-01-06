import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import OrderCard from '../../components/OrderCard/OrderCard';
import { DELIVERY_PRICE } from '../../constants';
import { getTotalPrice, setOrder } from '../../store/pizza';

const Chekout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const totalNumber = useAppSelector(getTotalPrice);

    const totalPrice = totalNumber.reduce((sum, cardDish) => {
        return sum + cardDish.amounte * cardDish.price;
    }, 0);

    console.log(totalNumber)

    const getCard = totalNumber.map(number => {
        return <OrderCard price={number.price} amount={number.amounte} title={number.title} key={number.id}/>
    })

    const finalSum = totalPrice + DELIVERY_PRICE;

    const postOrder = async () => {
        navigate('/')
        await dispatch(setOrder(totalNumber))
    }
    return (
        <div>
            {getCard}

            <p>Delivery: {DELIVERY_PRICE}</p>
            <b>Total: {finalSum}</b>

            <div className='my-5'>
                <Link to='/' className='btn btn-success me-5'>Cansel</Link>
                <button className='btn btn-primary' onClick={postOrder}>Order</button>
            </div>
        </div>
    );
};

export default Chekout;
