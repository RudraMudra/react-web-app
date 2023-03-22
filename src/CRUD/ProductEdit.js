import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export function ProductEdit()
{
    const params = useParams();
    const [product, setProduct] = useState([{}]);
    useEffect(()=>{
        axios({
            method: 'GET',
            url: `http://localhost:5000/details/${params.id}`
        })
        .then(response=>{
            setProduct(response.data);
        })
    },[]);

    /*
        - create formik form with initial values
        - collect values for elements
        - post to api using axios
        Syntax:
        onSubmit
        axios.update("http://localhost:4000/updateproduct/{values.ProductId}",{
            Name: values.Name,
            Price: values.Price,
            Stock: values.Stock
        })
        - redirect to products
    */
    return(
        <div>
            <h2>Edit Product</h2>
            <form>
                <dl>
                    <dt>Name</dt>
                    <dd><input onChange={(e)=>{
                        console.log(product);
                        var arr = product.map(
                            s => s
                        )
                        arr[0].Name = e.target.value
                        setProduct(arr)
                    }} value={product[0].Name} type="text"/></dd>
                    <dt>Price</dt>
                    <dd><input onChange={(e)=>{
                        console.log(product);
                        var arr = product.map(
                            s => s
                        )
                        arr[0].Price = e.target.value
                        setProduct(arr)
                    }} type="text" value={product[0].Price} /></dd>
                    <dt>Stock</dt>
                    <dd><input onChange={(e)=>{
                        console.log(product);
                        var arr = product.map(
                            s => s
                        )
                        arr[0].Stock = e.currentTarget.value
                        setProduct(arr)
                    }} type="checkbox" checked={product[0].Stock === true} />{(product[0].Stock===false)?"Available":"Out of Stock"}</dd>
                </dl>
                <button className="btn btn-info">Update</button>
            </form>
            <div>
                <Link to="/products">Back to Products</Link>
            </div>
        </div>
    )
}