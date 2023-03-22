import { Link } from "react-router-dom";
import './HomeComponent.css';

export function HomeComponent(){
    return(
        <div>
            <h2>Shopping Home</h2>
            <div className="container">
            <div className="register">
                <Link to="/register">New User Register</Link>
            </div>
            
            {/* <span> | </span> */}
            <div className="login">
                <Link to="/login">Existing User Login</Link>
            </div>
            </div>
            
            
        </div>
    )
}