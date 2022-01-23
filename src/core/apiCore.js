import { API } from "../config";
import queryString from 'query-string';

export const getProducts = (sort) => {
    return fetch(`${API}/products?sortBy=${sort}&order=desc&limit=6`, {
        method: "GET"
    })
    .then(res=>{
        return res.json();
    })
    .catch(error=>{
        console.log(error);
    })
}

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

export const getFilteredProducts = (skip, limit, filters={})=> {
    const data = {skip, limit, filters}
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res=>{
        return res.json();
    })
    .catch(err=>
        console.log(err)
    );
}

export const listSearched = (params) => {
    const query = queryString.stringify(params);
    console.log("query", query);
    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
    .then(res=>{
        return res.json();
    })
    .catch(error=>{
        console.log(error);
    })
}

export const readProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(res=>{
        return res.json();
    })
    .catch(error=>{
        console.log(error);
    })
}

export const listRelated = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method: "GET"
    })
    .then(res=>{
        return res.json();
    })
    .catch(error=>{
        console.log(error);
    })
}

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(res=>{
        return res.json();
    })
    .catch(error=>{
        console.log(error);
    })
}

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData)
    })
    .then(res=>{
        return res.json();
    })
    .catch(error=>{
        console.log(error);
    })
}

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({order: createOrderData})
    })
    .then(res=>{
        return res.json();
    })
    .catch(error=>{
        console.log(error);
    })
}
