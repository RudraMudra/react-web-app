import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import  {useCookies}  from "react-cookie";

export function LoginComponent(){
    let navigate = useNavigate();
    const[cookies, setCookie, removeCookie] = useCookies();
    const formik = useFormik({
        initialValues : {
            "UserName": '',
            "Password": ''
        },
        onSubmit: (values)=>{
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:4000/getusers'
            })
            .then(response=>{
                for(var user of response.data){
                    if(user.UserName == values.UserName && user.Password == values.Password){
                        setCookie('username', user.UserName);
                        navigate("/categories");
                        break;
                    }else{
                        navigate('/error');
                    }
                }
            })
        }
    })
    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h2>User Login</h2>
                <dl>
                    <dt>User Name</dt>
                    <dd><input name="UserName" onChange={formik.handleChange} type="text" /></dd>
                    <dt>Password</dt>
                    <dd><input name="Password" onChange={formik.handleChange} type="password" /></dd>
                </dl>
                <button className="btn btn-primary">Login</button>
                <p><Link to="/register">New user?</Link></p>
            </form>
        </div>
    )
}