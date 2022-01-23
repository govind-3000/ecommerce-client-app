import React , { useState } from 'react';
import Layout from '../core/Layout';
import {Link} from 'react-router-dom';
import { signup } from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error: '',
        success: false
    });
    
    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const {name, email, password, error, success} = values;
    
    const clickSubmit = (event)=>{
        event.preventDefault();
        setValues({...values, error: false});
        signup({name, email, password})
        .then(data=>{
            if(data.error){
                setValues({...values, error: data.error, success: false});
            } 
            else{
                setValues({
                    ...values,
                    name:'',
                    email:'',
                    password:'',
                    error:'',
                    success: true 
                })
            }
        });
    }

    const signUpForm = ()=>(
        <form>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input type="text" className="form-control" onChange={handleChange("name")}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>email</label>
                <input type="email" className="form-control" onChange={handleChange("email")}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input type="password" className="form-control" onChange={handleChange("password")}/>
            </div>
            <button className='btn btn-primary' onClick={clickSubmit}>Submit</button>
        </form>
    );

    const showError = () =>(
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
    
    const showSuccess = () => (
        <div className='alert alert-info' style={{display: success ? '' : 'none'}}>
            New User created, please <Link to="/signin">Signin</Link>
        </div>
    )

    return (
    <Layout title='Signup' description='ecommerce Signup' className='container col-md-8 offset-md-2'>
        {showError()}
        {showSuccess()}
        {signUpForm()}
    </Layout>
    )
}
    

export default Signup;