import React , { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from "../auth";
import { Link, Redirect, useParams } from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from './apiAdmin';

const UpdateProduct = () => {

    const[values, setValues] = useState({
        name: '',
        description:'',
        price:'',
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:false,
        error:false,
        createdProduct:'',
        formData:'',
        redirectToHome:false
    });
    const [categories, setCategories] = useState([]);

    const {user, token} = isAuthenticated();
    const {name, description, price,  category,  shipping, quantity, loading, error, createdProduct, formData, redirectToHome} = values;
    let productId = useParams().productId;  //fetching id from URL

    const init = (productId)=> {

        getProduct(productId).then(data=>{
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({
                    //populate state
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData(),
                })
                initCategories();
            }
        })

    }
    
    const initCategories = ()=> {
        getCategories().then(data=>{
            if(data.error){
                setValues({...values, error: data.error})
            } else{
                setCategories(data)
            }
        })
    }

    useEffect(()=>{
        init(productId);
    }, [])

    const handleChange = name => event => {
        const value = name==="photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, error:false, [name]:value});
    };

    const clickSubmit = (event)=> {
        event.preventDefault();
        setValues({...values, error: '', loading: true});
        updateProduct(user._id, token, productId, formData)
        .then(data=>{
            if(data.error){
                setValues({...values, error:data.error});
            }else{
                setValues({
                    ...values,
                    name:'',
                    description:'',
                    price:'',
                    photo:'',
                    quantity:'',
                    loading: false,
                    error:false, 
                    createdProduct: data.name,
                    redirectToHome: true
                    })
            }
        })
    };

    const newProductForm = ()=> (
        <form className='mb-3' onSubmit={clickSubmit}>
            <h3>Post form</h3>
            <div className='form-group'>
                <label className='btn btn-secondary'>
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*"/>                
                </label>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input onChange={handleChange('name')} type="text" className='form-control' value={name}/>
            </div>
            
            <div className='form-group'>
                <label className='text-muted'>Description</label>
                <textarea 
                    onChange={handleChange('description')} 
                    className='form-control' 
                    value={description}
                />
            </div>
            
            <div className='form-group'>
                <label className='text-muted'>Price</label>
                <input onChange={handleChange('price')} type="number" className='form-control' value={price}/>
            </div>
            
            <div className='form-group'>
                <label className='text-muted'>Category</label>
                <select onChange={handleChange('category')} className='form-control'>
                    <option>Please select</option>    
                    {categories && categories.map((c, i)=> (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}    
                </select>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Shipping</label>
                <select onChange={handleChange('shipping')} className='form-control'>
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className='form-control' value={quantity}/>
            </div>

            <button className='btn btn-outline-primary'>Update Product</button>
        </form>
    );

    const showError = ()=> (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = ()=> (
        <div className='alert alert-info' style={{display: createdProduct ? '' : 'none'}}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    const showLoading = ()=>
        loading && (
        <div className='alert alert-success' >
            <h3>Loading...</h3>
        </div>);

    const redirectUser = ()=> {
        if(redirectToHome && !error){
            return <Redirect to='/'/>
        }
    }

    return (
        <Layout title="Add a new Product" description={`Good day ${user.name}, please update product details`}>
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            {showLoading()}
                            {showSuccess()}
                            {showError()}
                            {newProductForm()}
                            {redirectUser()}
                        </div>
                    </div>
        </Layout>
    )
}

export default UpdateProduct;