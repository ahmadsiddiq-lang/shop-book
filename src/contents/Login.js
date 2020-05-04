import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import './Login.css'

const Login =()=>{
    const BASE_URL = 'http://54.204.68.167:4000';
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redy, setRedy] = useState(false);
    const [wrongEmail, setWrongEmail] = useState(false);
    const [wrongPass, setWrongPass] = useState(false);

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
                    setWrongEmail(true)
                    setTimeout(()=>{
                        setWrongEmail(false)
                    }, 5000)
                    return false;
                } else {
                    Axios.post(BASE_URL+'/login',data, {
                        withCredentials: true,
                    })
                    .then(res=>{
                        if(res.data === 0){
                            setWrongEmail(true)
                            setTimeout(()=>{
                                setWrongEmail(false)
                            }, 5000)
                        }else if(res.data === 1){
                            setWrongPass(true)
                            setTimeout(()=>{
                                setWrongPass(false)
                            }, 5000)
                        }else{
                            history.replace('/')
                        }
                    }).catch(err=>console.log(err))
                }
            }else{
                setWrongEmail(true)
                setWrongPass(true)
                setTimeout(()=>{
                    setWrongEmail(false)
                    setWrongPass(false)
                }, 5000)
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
                setWrongEmail(true)
                setTimeout(()=>{
                    setWrongEmail(false)
                }, 5000)
                return false;
            } else {
                Axios.post(BASE_URL+'/login',data, {
                    withCredentials: true,
                })
                .then(res=>{
                    if(res.data === 0){
                        setWrongEmail(true)
                        setTimeout(()=>{
                            setWrongEmail(false)
                        }, 5000)
                    }else if(res.data === 1){
                        setWrongPass(true)
                        setTimeout(()=>{
                            setWrongPass(false)
                        }, 5000)
                    }else{
                        history.replace('/')
                    }
                }).catch(err=>console.log(err))
            }
        }else{
            setWrongEmail(true)
            setWrongPass(true)
            setTimeout(()=>{
                setWrongEmail(false)
                setWrongPass(false)
            }, 5000)
        }
        
    }

    const gotoDashboard = ()=>{
        history.push('/')
    }

    useEffect(()=>{
        Axios.get('http://54.204.68.167:4000/verify',{
          withCredentials: true,
        }).then(res=>{
          // console.log(res)
          if(res.data[0]){
              setRedy(false)
            history.replace('/')
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
                    <Form.Control className={wrongEmail ? "wrong" : false} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
                    <p className={wrongEmail ? "warning warning-active" : "warning" }>Email Invalid</p>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className={wrongPass ? "wrong" : false} onKeyDown={handelLogin} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
                        <p className={wrongPass ? "warning warning-active" : "warning"}>Password Invalid</p>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                    </Form.Group>
                    
                    <Button className="btn-login" onClick={()=>handelLoginBtn()} variant="primary">Login</Button>
                    <p onClick={gotoDashboard} className="to-dashboard">View Dashboard</p>
                    </div>
                </div>
            </div>) : (<div className="redy"></div>)
        }
        </>
    )
}

export default Login;