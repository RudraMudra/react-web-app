import axios from "axios";
// import { response } from "express";
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import  { useCookies }  from "react-cookie";

export function ProductsIndex(){
    const[products, setProducts] = useState([]);
    const[user, setUser] = useState();
    const[cookies, removeCookie] = useCookies();
    let navigate = useNavigate();
    function GetProducts(){
        axios({
            method: "GET",
            url:"http://localhost:5000/products",
        }).then(response=>{
            setProducts(response.data);
        })
    }
    useEffect(()=>{
        GetProducts();
        // if(cookies["username"] == undefined){
        //     navigate("/login");
        // }else{
        //     setUser(cookies["username"]);
        //     axios({
        //         method: "GET",
        //         url:"http://localhost:5000/products",
        //     })
        //     .then(response=>{
        //             setProducts(response.data);
        //     })
        // }
    },[])

    function handleDeleteClick(e){
        // e.preventDefault();
        // alert(e.target.id);
        // var flag = confirm("Are u Sure! you want to Delete ?");
        // if(flag == true){
            axios({
                method: "DELETE",
                url: `http://localhost:5000/delete/${e.currentTarget.id}`
            })
            navigate("/home");
            alert("Record Deleted");
        // }
    }
    // function handleSignout(){
    //     removeCookie("username");
    //     navigate("/login");
    // }
    return(
        <div className="container-fluid">
            <h2>Products Data</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        {/* <th>Price</th>
                        <th>Stock</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product=>
                            <tr key={product.ProductId}>
                                <td>{product.Name}</td>
                                {/* <td>{product.Price}</td>
                                <td>{(product.Stock==true)?"Available":"Out of Stock"}</td> */}
                                <td>
                                    <Link to={'/productDetails/' + product.ProductId} className="btn btn-info me-2">
                                        <span className="bi bi-eye-fill"></span>
                                    </Link>
                                    <Link to={'/editproduct/' + product.ProductId} className="btn btn-warning me-2">
                                        <span className="bi bi-pen"></span>
                                    </Link>
                                    <button id={product.ProductId} onClick={handleDeleteClick} className="btn btn-danger">
                                        <span className="bi bi-trash"></span>
                                    </button>
                                    {/* <Link to="/delete" className="btn btn-danger">
                                        <span className="bi bi-trash"></span>
                                    </Link> */}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div>
                <Link to="/registerproduct">Add new Product</Link>
            </div>
        </div>
    )
}