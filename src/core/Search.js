import React from 'react';
import { useEffect, useState } from 'react';
import { getCategories, listSearched } from './apiCore.js';
import Card from './Card.js';

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search:'',
        results:[],
        searched: false
    })

    const {categories, category, search, results, searched} = data;

    const loadCategories = ()=> {
        getCategories().then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                setData({...data, categories:data})
            }
        })
    };

    useEffect(()=> {
        loadCategories();
        showSearched(results);
    }, []);

    const findResult = ()=> {
            listSearched({search: search || undefined, category: category}).then(res=>{
                if(res.error){
                    console.log(res.error);
                }else{
                    setData({...data, results: res, searched: true});
                }
            })
    }

    const handleSubmit = (event)=> {
        event.preventDefault();
        findResult();
    };
    
    const handleChange = name => event => {
        setData({...data, [name]:event.target.value, searched:false});
        
    };
    
    const searchMessage = (searched, results)=> {
        if(searched){
            if(results.length===1){
                return `Found ${results.length} Product`
            }
            else if(results.length>1){
                return `Found ${results.length} Products`
            }
            return "No Products found";
        }
    }

    const showSearched = (results=[])=> {
        return(
            <div >
                <h2 className='mt-4 mb-4'>
                    {searchMessage(searched, results)}
                </h2>
                <div className='row mt-4'>
                    {results.map((r, i)=>(
                        <Card key={i} product={r} />
                    ))}
                </div>
            </div>
        );
    };

    const searchForm = ()=> (
        <form onSubmit={handleSubmit}>
            <span className='input-group-text'>
                <div className='input-group input-group-lg'>

                    <div className='input-group-prepend'>
                        <select className='btn mr-2' onChange={handleChange("category")}>
                            <option value="All">All</option>
                            {categories.map((c, i)=><option key={i} value={c._id}>{c.name}</option>)}
                        </select>
                    </div>
                    
                    <input className='form-control' type="search" placeholder='Search by name' onChange={handleChange("search")}></input>
                </div>

                    <div className='btn input-group-append' style={{border: "none"}}>
                        <button className='input-group-text'>Search</button>
                    </div>

            </span>
        </form>
    );

    return (
        <div className='row'>
            <div className='container'>
                {searchForm()}
            </div>
            <div className='container-fluid'>
                {showSearched(results)}
            </div>
        </div>
        
    )
}

export default Search;