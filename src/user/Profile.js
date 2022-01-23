import React , {useState, useEffect} from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {read, update, updateUser} from './apiUser.js';
import { Redirect } from "react-router-dom";

const Profile = ()=>{
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:''
    });

    const {token , user:{_id}} = isAuthenticated();
    const {name, email, password, success} = values;

    const init = ()=> {
        read(_id, token).then(data=>{
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({...values,  name: data.name, email: data.email })
            }
        })
    }

    useEffect(()=> {
        init();
    }, [])

    const handleChange = name => e => {
        setValues({...values, error:'', [name]: e.target.value})
    }
    
    const clickSubmit = (e)=> {
        e.preventDefault();
        update(_id, token, {name, email, password})
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                updateUser(data, ()=>{
                    setValues({
                        ...values, 
                        name: data.name, 
                        email: data.email, 
                        success:true})
                });
            }
        })
    }

    const profileUpdateForm = (name, email)=> {
        return(
            <form>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" onChange={handleChange('name')} value={name}/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input type="text" className="form-control" onChange={handleChange('email')} value={email}/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input type="text" className="form-control" onChange={handleChange('password')} value={password}/>
                </div>
                    <button className="btn btn-primary" onClick={clickSubmit}>Submit</button>
            </form>
        )
    }

    const redirectUser = success => {
        if(success){
            return  <Redirect to='/cart'></Redirect>
        }
    }
    return(
        <Layout title="Profile" description="Update your profile" className="container-fluid">
            <h2 className="mb-4">Profile update</h2>
            {profileUpdateForm(name, email)}
            {redirectUser(success)}
        </Layout>
        );
}

export default Profile;