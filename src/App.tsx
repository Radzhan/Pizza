import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewDish from './components/newDish/newDish';
import AdminDishes from './containers/AdminDishes/AdminDishes';
import AdminOrders from './containers/AdminOrders/AdminOrders';
import Chekout from './containers/Checkout/Chekout';
import Client from './containers/Client/Client';

function App() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path='/' element={(
          <Client/>
        )}/>
        <Route path='/checkout' element={(
          <Chekout/>
        )}/>
        <Route path='/admin' element={(
          <h2>HI it's Admin Panel</h2>
        )} />
        <Route path='/admin/dishes' element={(
          <AdminDishes />
        )} />
        <Route path='/admin/new-dish' element={(
          <NewDish />
        )} />
        <Route path='/admin/edit/:id'element={(
          <NewDish/>
        )}/>
        <Route path='/admin/orders' element={(
          <AdminOrders/>
        )} />
        <Route path='*' element={(
          <h2>NOT FOUND !</h2>
        )} />
      </Routes>
    </div>
  );
}

export default App;
