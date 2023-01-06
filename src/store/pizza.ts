import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axiosApi from "../axiosApi";
import { cardDish, dishes, dishesApi, OrdersApi } from "../types";

interface PizzaState {
    array: dishesApi[];
    total: cardDish[];
    orders: OrdersApi[][];
}

const initialState: PizzaState = {
    array: [],
    total: [],
    orders: [],
}

export const getArrayDishes = createAsyncThunk<dishesApi[] | []>('pizza/fetchAll', async () => {
    const request = await axiosApi.get('/dishes.json');

    const getObject = Object.keys(request.data).map(key => {
        if (request.data === null) {
            return [];
        } else {
            const post = request.data[key];
            post.id = key;

            return post;
        }
    });
    return getObject;
})

export const setDishes = createAsyncThunk<void, dishes>('pizza/set', async (arg) => {
    await axiosApi.post('/dishes.json', arg);
})

export const removeDish = createAsyncThunk<void, string>('pizza/delete', async (id) => {
    await axiosApi.delete('/dishes/' + id + '.json');
})
interface Object {
    id: string;
    item: dishes;
}

export const putDish = createAsyncThunk<void, Object>('pizza/put', async (object) => {
    await axiosApi.put('/dishes/' + object.id + '.json', object.item);
})
interface forOrder {
    [id: string]: number;
}

export const setOrder = createAsyncThunk<void, cardDish[]>('pizza/setOrder', async (action) => {
    const order: forOrder = {};

    action.map(dish => order[dish.id] = dish.amounte);

    await axiosApi.post('/orders.json', order);
})

export const getOrdersArray = createAsyncThunk<OrdersApi[][]>('pizza/getOrder', async () => {
    const dishes = await axiosApi.get('/dishes.json');
    const orders = await axiosApi.get('/orders.json');

    const ordersObject = Object.keys(orders.data);

    const setOrder = Object.values(orders.data).map((ordersOne: any) => {
        return Object.keys(ordersOne).map((order, index) => {
            const orderForArray = {
                amounte: 0,
                price: 0,
                id: '',
                title: '',
                forDelete: ''
            };

            orderForArray.price = dishes.data[order].price;
            orderForArray.title = dishes.data[order].title;
            orderForArray.amounte = ordersOne[order];
            orderForArray.id = order;
            orderForArray.forDelete = ordersObject[index];

            return orderForArray;
        });
    });
    return setOrder;
})

export const deleteOrder = createAsyncThunk<void, string>('pizza/DeleteOrder', async (arg) => {
    await axiosApi.delete('/orders/' + arg + '.json')
})

export const contactSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        getPrice: (state, action) => {
            const number = Number(action.payload.price)
            const existingIndex = state.total.findIndex((item: cardDish) => {
                return item.title === action.payload.name;
            });

            if (existingIndex !== -1) {
                state.total[existingIndex].amounte++;
            } else {
                state.total.push({ title: action.payload.name, price: number, amounte: 1, id: action.payload.id });
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getArrayDishes.fulfilled, (state, action) => {
            state.array = action.payload;
        });
        builder.addCase(getOrdersArray.fulfilled, (state, action) => {
            state.orders = action.payload;
        })
    }
});

export const pizzaReduser = contactSlice.reducer;
export const { getPrice } = contactSlice.actions;
export const dishesArray = (state: RootState) => state.pizza.array
export const getTotalPrice = (state: RootState) => state.pizza.total
export const getArrayOrders = (state: RootState) => state.pizza.orders
