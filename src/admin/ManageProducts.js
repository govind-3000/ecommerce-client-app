import React, {useState, useEffect} from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deleteProduct, getAllProducts } from "./apiAdmin";

const ManageProducts = ()=> {
    const [products, setProducts] = useState([]);

    const{user, token} = isAuthenticated();

    const loadProducts = ()=> {
        getAllProducts().then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                setProducts(data);
            }
        })
    }

    const removeProduct = (productId)=> {
        deleteProduct(user._id, token, productId).then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                loadProducts();
            }
        })
    }

    useEffect(()=>{
        loadProducts();  
    }, []);

    return (
        <Layout title="Manage products" description='Perform CRUD on products' className="container">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Total products: {products.length}</h2>
                    <hr/>
                    <ul className="list-group">
                        {products.map((p, i)=>(
                            <li key={i} className="list-group-item ">
                                <strong>{p.name}</strong>

                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill ml-3 mr-3">Update</span>
                                </Link>

                                <span
                                    onClick={()=> removeProduct(p._id)}
                                    className="btn badge badge-danger badge-pill"
                                >
                                Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
        );
}

export default ManageProducts;