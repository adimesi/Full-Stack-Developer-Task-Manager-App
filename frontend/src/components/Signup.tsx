import React,{useState} from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Signup.css";

function Signup() {
    const {signup} = useAuth();
    const [email, setemail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirm, setPassword_confirm] = useState("");
    const navigate = useNavigate();
    

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== password_confirm) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            await signup({ email,username, password });
            toast.success("Signup successful! 🎉");
            navigate("/Login");

        } catch (error: any) {
            toast.error("Signup failed! ");   
        }
    };

 return (
    <div className="signup-container">
        <h2 className="signup-title">Signup</h2>
        <p className="signup-description">Please fill in your credentials to signup.</p>
        <form className="signup-form" onSubmit={handleSignup}>
            <label className="signup-label" htmlFor="email">Email:</label>
            <input 
                className="signup-input" 
                type="text" 
                id="email" 
                onChange={(e)=>setemail(e.target.value)} 
                value={email} />
            <label className="signup-label" htmlFor="username">Username:</label>
            <input
                className="signup-input"
                type="text"
                id="username"
                onChange={(e)=>setUsername(e.target.value)}
                value={username}/>
            <label className="signup-label" htmlFor="password">Password:</label>
            <input 
                className="signup-input"
                type="password"
                id="password"  
                onChange={(e) => setPassword(e.target.value)} 
                value={password} />
            <label className="signup-label" htmlFor="password_confirm">Confirm Password:</label>
            <input
                className="signup-input"
                type="password"
                id="password_confirm"
                onChange={(e) => setPassword_confirm(e.target.value)}
                value={password_confirm} />
            {password && password_confirm && password !== password_confirm && (
                <p className="signup-error" style={{ color: "red" }}>Passwords do not match</p>
            )}
            <button className="signup-button" name="signup_button" type="submit">Signup</button>
        </form>
        <div className="signup-footer text-center">
            <p className="signup-login-prompt text-sm text-gray-600">
                Already have an account?{' '}
                <Link className="signup-login-link" to="/Login">Login</Link>
            </p>
        </div>
   </div>
 )
}
export default Signup;

