import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./form.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";



//react redux howa jesr bin redux tolkit w tatbi9 react 



const Login = () => {


const[ email, setEmail ]= useState("");
const[ password, setPassword ]= useState("");


const dispatch = useDispatch();


//Form Submit Handler 
const formSubmitHandler = (e) => {
    e.preventDefault();

    if(email.trim() === "") return toast.error("Email is requires");
    if(password.trim() === "") return toast.error("Password is requires");

     dispatch(loginUser({email , password}));   // n5dh email w password men input eli ktbnehom w n3tih l login user w login user yb3th requete lserver 
}



    return ( 
        <section className="form-container">
            <h1 className="form-title">
                Login to your account
            </h1>
            <form onSubmit={formSubmitHandler} className="form">
  
      
            <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input 
                    type="email" 
                    className="form-input"
                    id="email"
                    placeholder="Enter your email"
                    value= {email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input 
                    type="password" 
                    className="form-input"
                    id="password"
                    placeholder="Enter your password"
                    value= {password}
                    onChange={(e) => setPassword(e.target.value)}
                     />
                </div>
                <button className ="form-btn" type="submit">
                    Login
                </button>
                </form>
                <div className="form-footer">
                  Did you forgot your password ? <Link to="/forgot-password">Forgot Password</Link>
                </div>
        </section>
     );
}
 
export default Login;