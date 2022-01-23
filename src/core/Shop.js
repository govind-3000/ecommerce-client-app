import React from 'react';
import Layout from './Layout.js';
import { useEffect, useState } from 'react';
import { getCategories, getFilteredProducts, getProducts } from './apiCore.js';
import Card from './Card.js';
import '../styles.css';
import CheckBox from './CheckBox.js';
import { prices } from './FixedPrices.js';
import { RadioBox } from './RadioBox.js';

const Shop = ()=> {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [myFilters, setMyFilters] = useState({
        filters: {category:[], price:[]}
    })
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(6);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [size, setSize] = useState(0);

    const init = ()=> {
        getCategories().then(data=>{
            if(data.error){
                setError(data.error);
            }else{
                setCategories(data);
            }
        })
    }

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;
        setMyFilters(newFilters);
        loadFilteredProducts(newFilters.filters);   //when filters applied mtd is called
    }

    const loadFilteredProducts = filterObj => {
        getFilteredProducts(skip, limit, filterObj)
        .then(data=>{
            if(data.error){
                setError(data.error);
            }else{
                setFilteredProducts(data.products);
                setSize(data.size);
                setSkip(0);
            }
        })
    }

    const LoadMore = ()=> {
        let toSkip=skip+limit;
        getFilteredProducts(toSkip, limit, myFilters.filters)
        .then(data=>{
            if(data.error){
                setError(data.error);
            }else{
                setFilteredProducts([...filteredProducts, ...data.products]);
                setSize(data.size);
                setSkip(toSkip);
            }
        })
    }

    const loadMoreButton = ()=> {
        return (
            size>0 && size>=limit && (
            <div>
                <button onClick={LoadMore} className='btn btn-warning mb-5'>Load More</button>
            </div>
            )
        )}

    useEffect(()=> {
        init();
        //when component is mounted mtd is called with empty filter condition
        loadFilteredProducts(myFilters.filters);    
    }, [])

    const showProducts = ()=> {
        const a = filteredProducts.products;
        console.log(typeof filteredProducts);
        a.map((p, i)=>{
            console.log(p);
        <div key={i}>
            <Card product={p}/>
        </div>
    })
};

    return (
        <Layout title='Shop' description='Search and find cats on your choice' className="container-fluid">
            <div className='row'>
                <div className='col-4'>
                    <h4>Filter by categories</h4>
                    <ul>
                        <CheckBox categories={categories} handleFilters={filters => handleFilters(filters, "category")}/>
                    </ul>

                    <h4>Filter by price range</h4>
                    <div>
                        <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, "price")}/>
                    </div>
                </div>
                <div className='col-8'>
                   <h2 className='mb-4'>Products</h2>
                   <div className='row'>
                        {filteredProducts.map((p, i) => (
                            <div key={i} className='col-4 mb-3'>
                                <Card  product={p} />
                            </div>
                        ))}
                    </div>
                    <hr></hr>
                    {loadMoreButton()} 
                </div>
            </div>
        </Layout>
    );
}

export default Shop;