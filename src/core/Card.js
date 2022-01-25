import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage.js';
import moment from 'moment';
import cartHelpers from './CartHelpers.js'

const Card = ({product, 
    showViewButton=true, 
    showAddToCartButton=true , 
    cartUpdate=false, 
    showRemoveProductButton=false,
    setRun = f => f,//default value fo function
    run = undefined,
    showFullDescription=false
    })=> {
    const [redirect, setRedirect] = useState();
    const[count, setCount] = useState(product.count);

    const showViewProductButton = (showViewButton)=> {
        return(
        showViewButton && 
        ( <Link to={`/product/${product._id}`}>
            <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                View Product
            </button>
        </Link> )
        );
    };
    //when add to cart clicked invoking this method to 
    //pass product to addItem function to store this in localStorage
    //then redirecting to cart page
    const addToCart = ()=> {
        cartHelpers.addItem(product, ()=>{
            setRedirect(true);
        })
    }

    const shouldRedirect = redirect => {
        if(redirect){
            return <Redirect to="/cart"/>
        }
    };

    const showAddToCartBtn = (showAddToCartButton)=> {
        return (
            showAddToCartButton && (
                <button onClick={addToCart} className='btn btn-outline-warning mt-2 mb-2'>
                    Add to Cart
                </button>
            )
        );
    };

    const showStock = (quantity)=> {
        return (quantity > 0) ? (<span className='badge badge-primary badge-pill'>In Stock</span>) : 
        (<span className='badge badge-primary badge-pill'>Out of Stock</span>);
    };

    const handleChange = productId => event => {
        setRun(!run);   //rerendering cart component
        setCount(event.target.value < 1 ? 1: event.target.value);
        if(event.target.value >=1 ){
            cartHelpers.updateItem(productId, event.target.value);
        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
            <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Adjust Quantity</span>
                    </div>
                    <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
                </div>
            </div>
            )
        );
    };

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button onClick={() => {
                    cartHelpers.removeItem(product._id);
                    setRun(!run)    //informing cart component
                    }}
                    className='btn btn-outline-danger mt-2 mb-2'
                >
                    Remove Product
                </button>
            )
        );
    };
    let dots="...";
    return (
            <div className='card'>
                <div className='card-header name'>{product.name}</div>
                <div className='card-body'>
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product"/>
                    <p>{`${showFullDescription ? product.description : product.description.substring(0, 100) }...`}</p>
                    <p className='black-10'>${product.price}</p>
                    <p className='black-9'>Category: {product.category && product.category.name}</p>
                    <p className='black-8'>Added {moment(product.createdAt).fromNow()}</p>
                        {showStock(product.quantity)}
                        <br/>
                        {showViewProductButton(showViewButton)}
                        {showAddToCartBtn(showAddToCartButton)}
                        {showCartUpdateOptions(cartUpdate)}
                        {showRemoveButton(showRemoveProductButton)}
                </div>
            </div>
    )
}

export default Card;