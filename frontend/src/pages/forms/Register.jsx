import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";



const Register = () => {

const dispatch = useDispatch();
const { registerMessage } = useSelector(state => state.auth);

const[ username, setUsername ]= useState("");
const[ email, setEmail ]= useState("");
const[ password, setPassword ]= useState("");


//Form Submit Handler 
const formSubmitHandler = (e) => {
    e.preventDefault();
    if(username.trim() === "") return toast.error("Username is requires");
    if(email.trim() === "") return toast.error("Email is requires");
    if(password.trim() === "") return toast.error("Password is requires");
     dispatch(registerUser({ username, email , password}))
}


const navigate = useNavigate();
//bch y3ti lel user message eli 5dhineh m serveur fi box swal box w fih button ki tenzl 3leha thez lel login page 
//then is ok y3ni ki ynzel ala ok thzou lel login 

if(registerMessage){
    swal({
        title: registerMessage,
        icon : "success" 
    }).then(isOk => {
        if(isOk) {
           navigate("/login"); //go to login page 
        }
    })
}












    return ( 
        <section className="form-container">
            <h1 className="form-title">
                Create new account
            </h1>
            <form onSubmit={formSubmitHandler} className="form">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input 
                    type="text" 
                    className="form-input"
                    id="username"
                    placeholder="Enter your username" 
                    value= {username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
      
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
                    Register
                </button>
                </form>
                <div className="form-footer">
                    Already have an account ? <Link to="/login">Login</Link>
                </div>
        </section>
     );
}
 
export default Register;