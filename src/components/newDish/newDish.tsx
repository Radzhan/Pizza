import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import axiosApi from '../../axiosApi';
import { getArrayDishes, putDish, setDishes } from '../../store/pizza';

const NewDish = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [dish, setDish] = useState({
        title: '',
        price: '',
        image: '',
    });

    const putContact = useCallback(async () => {
        const request = await axiosApi.get('/dishes/' + id + '.json');
        if (id !== undefined) {
            setDish(request.data);
        }
    }, [dispatch, id]);

    useEffect(() => {
        putContact().catch(console.error);
    }, [putContact]);

    const onDishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setDish(prev => ({ ...prev, [name]: value }));
    };

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/admin/dishes');
        const object = {
            id: id!,
            item: dish,
        };

        if (id === undefined) {
            await dispatch(setDishes(dish));
        } else {
            await dispatch(putDish(object));
        }
        await dispatch(getArrayDishes());
    };

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <div className="mb-3 row">
                    <label htmlFor="inputTitlte" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input type="text" name='title' className="form-control" id="inputTitle"
                            value={dish.title}
                            onChange={onDishChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPrice" className="col-sm-2 col-form-label">Price</label>
                    <div className="col-sm-10">
                        <input type="text" name='price' className="form-control" id="inputPrice"
                            value={dish.price}
                            onChange={onDishChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputImage" className="col-sm-2 col-form-label">Image</label>
                    <div className="col-sm-10">
                        <input type="text" name='image' className="form-control" id="inputPassword"
                            value={dish.image}
                            onChange={onDishChange} />
                    </div>
                </div>
                <button className='btn btn-primary'>Create</button>
            </form>
        </div>
    );
};

export default NewDish;