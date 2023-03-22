import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import  { useCookies }  from "react-cookie";

export function CategoriesComponent(){
    const [categories, setCategories] = useState([]);
    const[user, setUser] = useState();
    const[cookies, setCookie, removeCookie] = useCookies();
    let navigate = useNavigate();
    useEffect(()=> {
        if(cookies["username"] == undefined){
            navigate("/login");
        }else{
            setUser(cookies["username"]);
            fetch('http://fakestoreapi.com/products/categories')
            .then(response=>response.json())
            .then(data=>{
                setCategories(data);
            })
        }
        
    },[])
    function handleSignout(){
        removeCookie("username");
        navigate("/login");
    }
    return(
        <div>
            <h2>Product Categories - For {user} <button onClick={handleSignout} className="btn btn-link m-lg-4">Signout</button> </h2>
            <ol>
                {
                    categories.map(category=>
                        <li key={category}> <Link to={'/products/' + category}>{ category.toUpperCase() }</Link>  </li>
                        )
                }
            </ol>
        </div>
    )
}