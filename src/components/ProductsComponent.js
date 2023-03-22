import { useEffect, useState } from "react"
import { BrowserRouter, useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export function ProductsComponent(){
    const params = useParams();
    const[categoryname, setCategoryName] = useState();
    const[products, setProducts] = useState([]);
    const[user, setUser] = useState();
    const [cookies, removeCookie] = useCookies();
    let navigate = useNavigate();
    // function Loadproducts(){
    //     if(cookies["username"] == undefined){
    //         navigate("/login");
    //     }else{
    //         setUser(cookies["username"]);
    //         setCategoryName(params.category);
    //         fetch(`http://fakestoreapi.com/products/category/${params.category}`)
    //         .then(response => response.json())
    //         .then(data =>{
    //             setProducts(data);
    //             console.log(data);
    //         })
    //     }   
    // }
    useEffect(()=>{
        if(cookies["username"]==undefined){
            navigate("/login");
         } else {
          setUser(cookies["username"]);
          setCategoryName(params.category);
          fetch(`http://fakestoreapi.com/products/category/${params.category}`)
          .then(response => response.json())
          .then(data=> {
             setProducts(data);
             console.log(data);
          })
         }
        // alert(params.category);
    },[])
    return(
        <div>
            <h2> {categoryname} Products - {user}</h2>
            <div>
                {
                    products.map(product=>
                            <Link to={'/details/' + product.id}><img key={product.id} src={product.image} width="100" height="100" className="m-2 p-2" border="1" /></Link>

                        )
                }
            </div>
            <Link to="/categories">Back to Categories</Link>
            {/* <ol>
                {
                    products.map(product=>
                        <li>{product.title}</li>
                        )
                }
            </ol> */}
        </div>
    )
}