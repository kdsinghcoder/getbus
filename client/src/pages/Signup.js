import React,{useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'font-awesome/css/font-awesome.min.css';
import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser]= useState({
        name:"",email:"",password:"",cpassword:""
    });
    let name,value;
    const handleInputs = (e)=>{
        name = e.target.name;
        value = e.target.value;

        setUser({... user, [name]:value});

    }

    const HandleSubmit = async(e)=>{
        // e.preventDefault();
        const {name, email, password, cpassword}=user;
        const res = await fetch("/register",{
            method: "POST",
            headers:{
                "content-Type": "application/json"
            },
            body:JSON.stringify({
                name, email, password, cpassword
            })
        });
        const data = await res.json();
        if(data.status === 422 || !data){
            window.alert("Invalid Registration")
        }else{
            window.alert("Registration Successfull")
            navigate('/');

        }

    }

    return (
        <Container className='my-auto mt-auto'>
            <Row className='mx-auto'>
                <Col><img src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg" width="100%" height="100%" /></Col>
                <Col style={{margin: "auto auto"}}>
                    <div className="card card-body">
                        <h1 className="text-center mb-3">
                            <i className="fa fa-user-plus"></i> Register
                        </h1>
                        <form method="POST">
                            <div className="form-group">
                                <label for="name">Name</label>
                                <input type="name" id="name" name="name" className="form-control" 
                                value={user.name}
                                onChange={handleInputs}
                                autoComplete="off"
                                placeholder="Enter Name" />
                            </div>
                            <div className="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" className="form-control"
                                    value={user.email}
                                    onChange={handleInputs}
                                    autocomplete="off"
                                    placeholder="Enter Email" />
                            </div>
                            <div className="form-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" name="password" className="form-control"
                                   value={user.password}
                                   onChange={handleInputs}
                                   autocomplete="off"
                                   placeholder="Create Password"/>
                            </div>
                            <div className="form-group">
                                <label for="cpassword">Confirm Password</label>
                                <input type="password" id="cpassword" name="cpassword" className="form-control"
                                    value={user.cpassword}
                                    onChange={handleInputs}
                                    autocomplete="off"
                                    placeholder="Confirm Password"/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-danger mt-4"
                            onClick={HandleSubmit}
                            >
                                Register
                            </button>
                        </form>
                        <p className="lead mt-4">Have An Account?<Link to="/login">login</Link></p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Signup