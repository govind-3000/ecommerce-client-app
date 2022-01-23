import Card from "./Card";

 const addItem = (item , next) => {
    let cart=[];
    //pick the existing cart item if present
    if(typeof window !== "undefined"){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    }
    //pushing new item into cart array
    cart.push({
        ...item,
        count: 1
    });

    //looping the cart array and picking all ids set will filter
    //duplicate ids, then forming an array of id's,
    //mapping through each id and fetching the first matched product
    //from cart array and returning
    cart = Array.from(new Set(cart.map(p=>p._id))).map((id)=>{
        return cart.find(p=>p._id===id);
    });
    //setting cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    next();
}

const itemCount = ()=> {
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
}

const getCart = ()=> {
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
}

const updateItem = (productId, count)=> {
    let cart=[];

    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart  = JSON.parse(localStorage.getItem('cart'));
        }
    
    cart.map((product, i)=>{
        if(product._id === productId){
            cart[i].count = count;
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    }
};

const removeItem = (productId)=> {
    let cart=[];

    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart  = JSON.parse(localStorage.getItem('cart'));
        }
    
    cart.map((product, i)=>{
        if(product._id === productId){
            cart.splice(i, 1);
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    }
    // return cart;
};

export const emptyCart = next => {
    if(typeof window !== 'undefined'){
        localStorage.removeItem('cart');
        next();
    }
}

export default {addItem, itemCount, getCart, updateItem, removeItem, emptyCart};