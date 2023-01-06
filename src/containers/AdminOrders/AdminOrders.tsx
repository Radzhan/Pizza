import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DELIVERY_PRICE } from '../../constants';
import { deleteOrder, getArrayOrders, getOrdersArray } from '../../store/pizza';

const AdminOrders = () => {
    const orders = useAppSelector(getArrayOrders)
    const dispatch = useAppDispatch();

    const getOrders = useCallback(async () => {
        await dispatch(getOrdersArray());

    }, [dispatch]);

    useEffect(() => {
        getOrders().catch(console.error);
    }, [getOrders]);

    const remove = async (id : string) => {
        await dispatch(deleteOrder(id))
        await dispatch(getOrdersArray());
    } 

    const createOrders = orders.map((order) => {
        const totalPrice = order.reduce((sum, cardDish) => {
            return sum + cardDish.amounte * cardDish.price;
        }, 0);
        return order.map((dish, index) => {
            return index !== order.length-1 ? <div key={dish.id} >
                <span>x {dish.amounte}</span>
                <span className='mx-4'>{dish.title}</span>
                <span>{dish.price}</span>
            </div> : <div key={dish.id} className='mb-5'>
                <span>x {dish.amounte}</span>
                <span className='mx-4'>{dish.title}</span>
                <span>{dish.price}</span>
                <p>Delivary: {DELIVERY_PRICE}</p>
                <>Total: {totalPrice + DELIVERY_PRICE}</>
                <button onClick={() => remove(order[0].forDelete)} >Delete</button>
            </div>
        })
    })

    return (
        <div>
            {createOrders}
        </div>
    );
};

export default AdminOrders;