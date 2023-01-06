import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Card from '../../components/Card/Card';
import { dishesArray, getArrayDishes } from '../../store/pizza';

const AdminDishes = () => {
    const dispatch = useAppDispatch();
    const dishes = useAppSelector(dishesArray);

    const getDishes = useCallback(async () => {
        await dispatch(getArrayDishes());
    }, [dispatch]);

    useEffect(() => {
        getDishes().catch(console.error);
    }, [getDishes]);

    const createCardWithDishes = dishes.map(dish => {
        return <Card title={dish.title} image={dish.image} price={dish.price} id={dish.id} key={dish.id}></Card>;
    });
    return (
        <div>
            <Link to='/admin/new-dish' className='btn btn-primary'>Create New Dish</Link>
            {createCardWithDishes}
        </div>
    );
};

export default AdminDishes;