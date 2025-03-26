import React,{useState} from "react";
import { useAuth } from "../contexts/AuthContext";
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";


function Login() {
    const {login} = useAuth();
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login({ email, password });
            toast.success("Login successful! 🎉");
            navigate("/Dashboard");
        
        } catch (error: any) {
            toast.error("Login failed!");
        }
    };
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/Signup");
    };

 return (
<div className="login-container">
 <h2 className="login-title">Login</h2>
 <p className="login-description">Please fill in your credentials to login.</p>
 <form className="login-form" onSubmit={handleLogin}>
      <label className="login-label" htmlFor="username">Email:</label>
      <input 
      className="login-input" 
      type="text" 
      id="username" 
      onChange={(e)=>setemail(e.target.value)} 
      value={email} />
      <label className="login-label" htmlFor="password">Password:</label>
      <input 
      className="login-input" 
      type="password"
      id="password"  
      onChange={(e)=>setPassword(e.target.value)} 
      value={password} />
      <button 
            className="login-button" 
            name="login_button" 
            type="submit" 
      >
            Login
      </button>
 </form>
 <div className="signup-container text-center">
      <p className="signup-text text-sm text-gray-600">
         Don't have an account?{' '}
            <button className="signup-button" name="signup_button" onClick={handleSignup}>Signup</button>
      </p>
 </div>
</div>

 )
}
export default Login;