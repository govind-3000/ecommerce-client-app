import { API } from '../config';

export const createCategory = (userId, token, category) =>{
    return fetch(`${API}/category/create/${userId}`, 
            {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    Authorization : `Bearer ${token}`
                },
                body: JSON.stringify(category)
            })
            .then(res=>{
                return res.json();
            })
            .catch(error=>
                console.log(error)
            );
};

export const createProduct = (userId, token, product) =>{
    return fetch(`${API}/product/create/${userId}`, 
            {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    Authorization : `Bearer ${token}`
                },
                body: product
            })
            .then(res=>{
                return res.json();
            })
            .catch(error=>
                console.log(error)
            );
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(res=>{
        return res.json();
    })
    .catch(error=>{
        console.log(error);
    })
}

export const listOrders = (userId, token)=> {
    return fetch(`${API}/order/list/${userId}`, 
    {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
    .then(orders=> {
        return orders.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

export const getStatusValues = (userId, token)=> {
    return fetch(`${API}/order/status-values/${userId}`, 
    {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
    .then(orders=> {
        return orders.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

export const updateStatusValue = (userId, token, orderId, status)=> {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    })
    .then(response=> {
        return response.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

/**
 * CRUD on products
 * get all products
 * get single product
 * update a product
 * delete a product
 */

 export const getAllProducts = () => {
    return fetch(`${API}/products?limit=100`, {
        method: "GET"
    })
    .then(response=>{
        return response.json();
    })
    .catch(error=>{
        console.log(error);
    })
}

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(response=>{
        return response.json();
    })
    .catch(error=>{
        console.log(error);
    })
}

export const updateProduct = (userId, token, productId, product)=> {
    return fetch(`${API}/product/${productId}/${userId}`, 
    {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: product
    })
    .then(product=> {
        return product.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

export const deleteProduct = (userId, token, productId)=> {
    return fetch(`${API}/product/${productId}/${userId}`, 
    {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        },
    })
    .then(response=> {
        return response.json()
    })
    .catch(error=>{
        console.log(error)
    })
}