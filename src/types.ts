export interface dishesApi {
    image: string;
    title: string;
    price: string;
    id: string;
}

export type dishes = Omit<dishesApi, 'id'>;

export interface cardDish{
    title: string;
    amounte: number;
    price: number;
    id: string
}

export interface OrdersApi {
    amounte: number;
    price: number;
    id: string;
    title: string;
    forDelete: string
}