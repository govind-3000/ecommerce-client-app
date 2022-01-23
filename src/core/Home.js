import React, { useEffect, useState } from 'react';
import Layout from './Layout.js';
import { getProducts } from './apiCore.js';
import Card from './Card.js';
import Search from './Search.js';

const Home = () => {
    const [productBySell, setProductBySell] = useState([]);
    const [productByArrival, setProductByArrival] = useState([]);
    const [error, setError] = useState('');

    const loadProductBySell = ()=> {
        getProducts('sold').then(data=>{
            if(data.error){
                setError(data.error);
            }
            else{
                setProductBySell(data);
            }
        })
    };

    const loadProductByArrival = ()=> {
        getProducts('createdAt').then(data=>{
            if(data.error){
                setError(data.error);
            }
            else{
                setProductByArrival(data);
            }
        })
    }
    //invoke the mtds  when component is mounted and also when there is any change in state
    useEffect(()=>{
        loadProductBySell();
        loadProductByArrival();
    }, []);

    return (
        <Layout title='Home' description='Welcome to shopCat!..' className="container-fluid">
            <h2>{Search()}</h2>
            <h2 className='mb-4'>New Arrivals</h2>
            <div className='row'>
                {productByArrival.map((product, i)=>(
                    <div key={i} className='col-4 mb-3'>
                        <Card product={product}/>
                    </div>
                ))}
            </div>

            <h2 className='mb-4'>Best Selling</h2>
            <div className='row'>
                {productBySell.map((product, i)=>(
                    <div key={i} className='col-4 mb-3'>
                        <Card product={product}/>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default Home;