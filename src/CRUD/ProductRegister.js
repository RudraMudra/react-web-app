import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function ProductRegister(){
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            ProductId: 0,
            Name: "",
            Price: 0,
            Stock:false
        },
        onSubmit : (values)=>{
            values.Stock = (values.Stock==true)?"true":"false";
            axios({
                method: "POST",
                url: "http://localhost:5000/addproduct",
                data: values
            })
            alert("Record Inserted Successfully..")
            navigate("/products");
        }
    })
    return(
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Product Id</dt>
                    <dd><input name="ProductId" onChange={formik.handleChange} type="number" /></dd>
                    <dt>Name</dt>
                    <dd><input name="Name" onChange={formik.handleChange} type="text" /></dd>
                    <dt>Price</dt>
                    <dd><input name="Price" onChange={formik.handleChange} type="text" /></dd>
                    <dt>Stock</dt>
                    <dd className="form-switch"><input name="Stock" checked={formik.values.Stock} onChange={formik.handleChange} className="form-check-input" type="checkbox" />Available</dd>
                </dl>
                <button className="btn btn-primary">Add Product</button>
            </form>
            <div>
                <Link to="/products">View Products</Link>
            </div>
        </div>
    )
}