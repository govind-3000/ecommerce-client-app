import React from 'react';
import Layout from './Layout.js';
import { useEffect, useState } from 'react';
import { emptyCart } from './CartHelpers.js';
import Card from './Card.js';
import { isAuthenticated } from '../auth/index.js';
import { Link } from 'react-router-dom';
import { createOrder, getBraintreeClientToken, processPayment } from './apiCore.js';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({products, setRun = f => f, run=undefined})=> {
    const [data, setData] = useState({
        loading: false,
        clientToken: null,
        error: '',
        success: false,
        instance: {},
        address:''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    
    const getToken = (userId, token)=> {
        getBraintreeClientToken(userId, token).then(data=> {
            if(data.error){
                setData({...data, error: data.error})
            }else{
                setData({clientToken: data.clientToken})
            }
        });
    };

    useEffect(()=>{
        getToken(userId, token);
    }, []);

    const getTotal = ()=> {
        const totalSum = products.reduce((Prevsum, nextProduct)=> {
            return Prevsum + nextProduct.count * nextProduct.price;
        }, 0);

        return totalSum;
    };

    const showCheckout = ()=> {
        return (
            isAuthenticated() ? (
                <div>
                    {showDropin()}
                </div>
            ) : (
                <Link>
                    <button className='btn btn-primary' >
                        Signin to checkout
                    </button>
                </Link>
            )
        );
    };

    const handleAddress = event => {
        setData({...data, address:  event.target.value});
    }

    const showDropin = ()=> (
        <div onBlur={()=> setData({...data, error: ''})}>
            {data.clientToken!==null && products.length>0 ? (
                <div>
                    <div className='form-group mb-3'>
                        <label className='text-muted'>Delivery Address:</label>
                        <textarea
                            onChange={handleAddress}
                            className='form-control'
                            value={data.address}
                            placeholder='Type your address here...'
                        />
                    </div>
                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal:{
                                flow: 'vault'
                            }
                        }}
                        onInstance={instance=> (data.instance = instance)}
                    />
                    {/* {console.log(data.clientToken.clientToken)} */}
                    <button onClick={buy} className='btn btn-success btn-block' >
                        Pay
                    </button>
                </div>
            ):null}
        </div>
    );

    let deliveryAddress = data.address;
    const buy = ()=> {
        setData({...data, loading:true});
        let nonce;
        let getNonce = data.instance
        .requestPaymentMethod()
        .then(data=>{
            // console.log(data);
            //once you have nonce(card type) send nonce and total amount to be charged
            nonce = data.nonce;
            // console.log('nonce and total amount', nonce, getTotal(products));
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            }

            processPayment(userId, token, paymentData)
            .then(response=>{
                    //create order
                const createOrderData = {
                    products: products,
                    address: deliveryAddress,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount
                };
                createOrder(userId, token, createOrderData)
                .then(response=>{
                    //empty cart
                    emptyCart(()=>{
                        setRun(!run);
                        console.log('payment success and empty cart')
                        setData({loading:false, success: true})
                    })
                })
                .catch(error=> {
                    console.log(error);
                    setData({loading:false});
                });
            })
            .catch(error=> {
                console.log(error);
                setData({loading:false});
            });
        })
        .catch(error=>{
            setData({...data, error: error.message})
        });
    }

    const showLoading = loading => loading && <h2 className='alert alert-danger'>Loading...</h2>;

    const showError = (error)=> (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = (success)=> (
        <div className='alert alert-success' style={{display: success ? '' : 'none'}}>
            Your payment is successful!..
        </div>
    )


    return (
        <div>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            <h2>Total:${getTotal()}</h2>
            {showCheckout()}
        </div>
    );
};

export default Checkout;