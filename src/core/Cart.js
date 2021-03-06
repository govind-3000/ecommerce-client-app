import React from 'react';
import Layout from './Layout.js';
import { useEffect, useState } from 'react';
import Card from './Card.js';
import cartHelpers from './CartHelpers.js';
import {Link} from 'react-router-dom';
import Checkout from './Checkout.js';

const Cart = ()=> {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(()=> {
        setItems(cartHelpers.getCart());
    }, [run])

    const showItems = (items)=> {
        return ( 
            <div>
                <h2>Your Cart have {items.length} Products</h2>
                <hr/>
                {items.map((product, i)=> (
                    <Card 
                        key={i} 
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
    )}

    const noItemsMessage = ()=> (
        <h2>Your Cart is empty. <br/> <Link to='/shop'>Continue Shopping</Link></h2>
    );

    return (
        <Layout title='Shopping Cart' description='You are one step away to have your favourite Cats at Home!.. Add Cats to your cart and choose your payment method' className="container-fluid">
            <div className='row'>
                <div className='col-6'>
                    {items.length>0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className='col-6'>
                    <h2>Your cart summary</h2>
                    <hr/>
                    <Checkout products={items} setRun={setRun} run={run}/>
                </div>
            </div>

        </Layout>
    );
}

export default Cart;