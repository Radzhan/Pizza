import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Card from '../../components/Card/Card';
import { dishesArray, getArrayDishes, getPrice, getTotalPrice } from '../../store/pizza';

const Client = () => {
    const dispatch = useAppDispatch();
    const dishes = useAppSelector(dishesArray);
    const totalNumber = useAppSelector(getTotalPrice);

    const getDishes = useCallback(async () => {
        await dispatch(getArrayDishes());
    }, [dispatch]);

    useEffect(() => {
        getDishes().catch(console.error);
    }, [getDishes]);

    const totalPrice = totalNumber.reduce((sum, cardDish) => {
        return sum + cardDish.amounte * cardDish.price;
    }, 0);

    const total = (price: string, name: string, id: string) => {
        const object = {
            price,
            name,
            id,
        };
        dispatch(getPrice(object));
    }

    const createCardWithDishes = dishes.map(dish => {
        return <Card title={dish.title} image={dish.image} price={dish.price} id={dish.id} key={dish.id} totalOnClick={() => total(dish.price, dish.title, dish.id)}></Card>;
    });
    
    return (
        <div>
            {createCardWithDishes}
            <b>Total: {totalPrice}</b>
            <Link to='/checkout' className='btn btn-primary ms-5'>Checkout</Link>
        </div>
    );

};

export default Client;