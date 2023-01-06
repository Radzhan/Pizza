import React, { MouseEventHandler } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { getArrayDishes, removeDish } from '../../store/pizza';

interface Props {
    image: string;
    title: string;
    price: string;
    id: string;
    totalOnClick?: MouseEventHandler;
}

const Card: React.FC<Props> = ({ title, image, id, price, totalOnClick }) => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const remove = async (id: string) => {
        await dispatch(removeDish(id));
        await dispatch(getArrayDishes());
    };

    let buttons = (
        <><Link to={'/admin/edit/' + id} className='btn btn-success mx-5'>Edit</Link><button className='btn btn-primary' onClick={() => remove(id)}>Delete</button></>
    )

    if (location.pathname === '/') {
        buttons = <div></div>
    }

    return (
        <div className='d-flex align-items-center my-3 border border-secondary' onClick={totalOnClick}>
            <img src={image} className="me-5" alt="dishes" style={{ width: "11rem" }} />
            <p className='m-0'>{title}</p>
            <b className='ms-5'>{price}</b>
            {buttons}
        </div>
    );
};

export default Card;