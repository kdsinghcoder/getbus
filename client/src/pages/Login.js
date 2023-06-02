import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App.js';
const Login = () => {

const {state, dispatch} = useContext(UserContext);

const [email, setEmail]=useState('');
const [password, setPassword]=useState('');

const navigate = useNavigate();

const handelLogin = async(e)=>{
    e.preventDefault();
    const res = await fetch("/signin",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },body:JSON.stringify({
            email,password
        })
    });
    console.log(res);
    const data = res
    console.log("from login handler " + data);
    if(res.status===400 || !data){
        window.alert("Invalid credentals");
    }else{
        dispatch({type:"USER",payload: true});
        navigate('/findbuss');
    }
}

  return (
    <div className="container mt-4">
    <div className="row">
        <div className="col-sm-6">
            <img src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg" width="100%" height="100%" />
        </div>
        <div className="col-md-6" style={{margin: "auto auto"}}>
            <div className="card card-body">
                <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i> Login</h1>
                    <form method="POST">
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" className="form-control"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder="Enter Email" />
                        </div>
                        <div className="form-group mt-2">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" className="form-control"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder="Enter Password" />
                        </div>
                        <button type="submit" 
                        onClick={handelLogin}
                        className="btn btn-primary btn-block btn-danger mt-4" style={{margin: "auto auto"}}>Login</button>
                    </form>
                    <p className="lead mt-4">
                        No Account? <Link to="/signup">SignUp</Link>
                    </p>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login