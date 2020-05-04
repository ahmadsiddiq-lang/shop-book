import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import './Login.css'
import Swal from 'sweetalert2';

const Login =()=>{
    const BASE_URL = 'http://192.168.1.12:4000';
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redy, setRedy] = useState(false);

    const handelLogin = (e)=>{
        if(e.key === 'Enter'){
            if(email.length > 0 && password.length > 0){
                const data ={
                    email:email,
                    password:password
                }
                var atps=email.indexOf("@");
                var dots=email.lastIndexOf(".");
                if (atps<1 || dots<atps+2 || dots+2>=email.length) {
                    Swal.fire({
                        icon: 'info',
                        text: 'Email invalid',
                    })
                    return false;
                } else {
                    Axios.post(BASE_URL+'/login',data, {
                        withCredentials: true,
                    })
                    .then(res=>{
                        if(res.data === 0){
                            Swal.fire({
                                icon: 'info',
                                text: 'Email wrong',
                            })
                        }else if(res.data === 1){
                            Swal.fire({
                                icon: 'info',
                                text: 'Password wrong',
                            })
                        }else{
                            history.replace('/Home')
                        }
                    }).catch(err=>console.log(err))
                }
            }else{
                Swal.fire({
                    icon: 'info',
                    text: 'Please enter your data',
                })
            }
        }
        
    }
    const handelLoginBtn = ()=>{
        if(email.length > 0 && password.length > 0){
            const data ={
                email:email,
                password:password
            }
            var atps=email.indexOf("@");
            var dots=email.lastIndexOf(".");
            if (atps<1 || dots<atps+2 || dots+2>=email.length) {
                Swal.fire({
                    icon: 'info',
                    text: 'Email invalid',
                })
                return false;
            } else {
                Axios.post(BASE_URL+'/login',data, {
                    withCredentials: true,
                })
                .then(res=>{
                    if(res.data === 0){
                        Swal.fire({
                            icon: 'info',
                            text: 'Email wrong',
                        })
                    }else if(res.data === 1){
                        Swal.fire({
                            icon: 'info',
                            text: 'Password wrong',
                        })
                    }else{
                        history.replace('/Home')
                    }
                }).catch(err=>console.log(err))
            }
    }else{
        Swal.fire({
            icon: 'info',
            text: 'Please enter your data',
        })
    }
        
    }

    useEffect(()=>{
        Axios.get('http://192.168.1.12:4000/verify',{
          withCredentials: true,
        }).then(res=>{
          // console.log(res)
          if(res.data[0]){
              setRedy(false)
            history.replace('/Home')
          }else{
            setRedy(true)
          }
        } ).catch(err=>{console.log(err)})
    },[history])
    
    return(
        <>
        {
            redy ? 
            (<div className="Login-Conten" style={{height:window.innerHeight}}>
                <div className="box-text">
                    <h1>Cashier App</h1>
                    <h2>Aplication</h2>
                    <p>Login from here to access</p>
                </div>
                <div className="login-box-form">
                    <div className="form-input">
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onKeyDown={handelLogin} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                    </Form.Group>
                    
                    <Button className="btn-login" onClick={()=>handelLoginBtn()} variant="primary">Login</Button>
                    </div>
                </div>
            </div>) : (<div className="redy"></div>)
        }
        </>
    )
}

export default Login;