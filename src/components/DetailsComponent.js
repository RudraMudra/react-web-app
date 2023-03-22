import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function DetailsComponent(){
    const params = useParams();
    const[product, setProduct] = useState({});

    useEffect(() =>{
        fetch(`http://fakestoreapi.com/products/${params.id}`)
        .then(response=> response.json())
        .then(data=>{
            setProduct(data);
        })
    })
    return(
        <div>
            <h2>Details</h2>
            <dl>
                <dt>Title</dt>
                <dd>{product.title}</dd>
                <dt>price</dt>
                <dd>{product.price}</dd>
                <dt>Preview</dt>
                <dd>
                    <img src={product.image} width="100" height="100" />
                </dd>
            </dl>
            <Link to={"/products/" + product.category}>Back to Products</Link>
        </div>
    )
}