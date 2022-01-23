import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const {user:{name, email, role}} = isAuthenticated();

const AdminDashboard = () => {

    const adminInfo = ()=> {
        return (
            <div className="card mb-5" >
                <h3 className="card-header">Admin dashboard</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role===1 ? "Admin" : "Registered User"}</li>
                </ul>
            </div>
        );
    }

    const adminLinks = ()=> {
        return (
            <div className="card">
                <h4 className="card-header">Admin links</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link className="nav-bar" to="/create/category">Create Category</Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-bar" to="/create/product">Create Product</Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-bar" to="/admin/orders">View Orders</Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-bar" to="/admin/products">Manage products</Link>
                        </li>
                    </ul>
            </div>
        );
    }

    return (
        <Layout title="Dashboard" description={`Good day ${name}!...`} className="container">
            <div className="row">
                <div className="col-3">
                        {adminLinks()}
                </div>
                <div className="col-9">
                        {adminInfo()}
                </div>
            </div>
        </Layout>
        );
}

export default AdminDashboard;