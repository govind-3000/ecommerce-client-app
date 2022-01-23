import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home.js';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard.js'
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import AddCategory from './admin/AddCategory.js';
import AddProduct from './admin/AddProduct.js';
import Shop from './core/Shop.js';
import Product from './core/Product.js';
import Cart from './core/Cart.js';
import Orders from './admin/Orders.js';
import Profile from './user/Profile.js';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';

const Routes = () => {
    return (
    <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/signin' exact component={Signin}/>
                <Route path='/signup' exact component={Signup}/>
                <Route path='/shop' exact component={Shop}/>
                <PrivateRoute path='/user/dashboard' exact component={Dashboard}/>
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard}/>
                <AdminRoute path='/create/category' exact component={AddCategory}/>
                <AdminRoute path='/create/product' exact component={AddProduct}/>
                <Route path='/product/:productId' exact component={Product}/>
                <Route path='/cart' exact component={Cart}/>
                <AdminRoute path='/admin/orders' exact component={Orders}/>
                <PrivateRoute path='/profile/:userId' exact component={Profile}/>
                <AdminRoute path='/admin/products' exact component={ManageProducts}/>
                <AdminRoute path='/admin/product/update/:productId' exact component={UpdateProduct}/>
            </Switch>
    </BrowserRouter>
)}
 
export default Routes;