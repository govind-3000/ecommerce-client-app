import React , { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from "../auth";
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = ()=> {
    //setting state fields and methods
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    //destructuring user and token from localStorage
    const {user, token} = isAuthenticated();

    const handleChange = (event) => {
        setError('');
        setName(event.target.value);
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);
        //make api call to add category
        createCategory(user._id, token, {name})
        .then(data=>{
            if(data.error){
                setError(data.error);
            }else{
                setError('');
                setSuccess(true);
            }
        });
    };

    const newCategoryForm = ()=> (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">
                    Name
                </label>

                <input 
                    type="text" 
                    className="form-control" 
                    onChange={handleChange} 
                    value={name} 
                    autoFocus
                    required
                />
            </div>
                <button className="btn btn-outline-primary">
                    Create Category
                </button>
        </form>
    );

    const handleError = () => {
        if(error){
            return <h3 className='text-danger'>Category has to be unique</h3>;
        }
    };

    const handleSuccess = () => {
        if(success){
            return <h3 className='text-success'>{name} is created!</h3>;
        }
    };

    const goBack = ()=> (
        <div className='mt-5'>
            <Link to="/admin/dashboard" className='text-warning'>
                Back to Dashboard
            </Link>
        </div>
    );
    
    return (
            <Layout title="Add a new Category" description={`Good day ${user.name}, please add a category`}>
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            {handleSuccess()}
                            {handleError()}
                            {newCategoryForm()}
                            {goBack()}
                        </div>
                    </div>
            </Layout>
        );
};

export default AddCategory;