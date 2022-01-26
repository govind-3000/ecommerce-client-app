import React from 'react';
import Layout from './Layout.js';
import { useEffect, useState } from 'react';
import { readProduct, listRelated } from './apiCore.js';
import Card from './Card.js';
import {useParams} from 'react-router-dom';

const Product = ()=> {
    const [product, setProduct] = useState();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [error, setError] = useState();
    let id = useParams().productId;

    const loadProduct = (productId)=> {
        readProduct(productId).then(data=>{
            if(data.error){
                setError(data.error);
            }else{
                setProduct(data);
                //fetch related products
                listRelated(data._id).then(data=>{
                    if(data.error){
                        setError(data.error);
                    }else{
                        setRelatedProducts(data);
                    }
                });
            }
        });
    };
        
    useEffect(()=>{
        loadProduct(id);
    }, [useParams().productId])

    return (
        <Layout title={product && product.name} description={`${product && product.description.substring(0, 100)}...`} className="container-fluid">
            <div className='row'>
                <div className='col-8'>
                    {product && product.description && <Card product={product} showViewButton={false} showFullDescription={true}/>  }  
                </div>
                <div className='col-4'>
                    <h4 className='black-10'>Related Products</h4>
                    {relatedProducts.map((p, i)=>(
                        <div className='mb-4' key={i}>
                            <Card product={p}/>
                        </div>
                    ))}
                </div>
            </div>    
        </Layout>
    );
}

export default Product;