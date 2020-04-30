import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';

const Login =()=>{
    const BASE_URL = 'http://192.168.1.12:4000';
    const history = useHistory();
    const [emial, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handelLogin = ()=>{
        const data ={
            email:emial,
            password:password
        }
        Axios.post(BASE_URL+'/login',data)
        .then(res=>{
            console.log(res)
            // history.push('/Home')
            localStorage.setItem('email', res.data)
        }).catch(err=>console.log(err))
    }

    useEffect(()=>{
        const email = localStorage.getItem('email')
        if(email !== 0){
            history.push('/Home');
        }
    })
    
    return(
        <>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button onClick={()=>handelLogin()} variant="primary" type="submit">
                Login
            </Button>
        </>
    )
}

export default Login;