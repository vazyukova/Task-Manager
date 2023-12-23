import React, {useState } from 'react'
import {Button, Form, Image, Container, Row, Col} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import '../App.css';
import AuthService from '../services/auth.service';
import logoPicture from '../images/auth-logo.svg';
import logo from '../images/logo.svg';

export default function Auth(){
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleUsername = event => {
        setUsername(event.target.value);
    }

    const handlePassword = event => {
        setPassword(event.target.value);
    }

    const contains = (arr, elem) => {
        console.log(arr)
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === elem) {
                return true;
            }
        }
        return false;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        if (username === "" || password === ""){
            setMessage("Введите логин и пароль");
        }
        else{
          AuthService.login(username, password).then(
            () => {
                let user = JSON.parse(localStorage.getItem('user'));
                if (contains(user.roles, 'ADMIN')){
                    navigate("/projects");
                    window.location.reload();
                }
                else{
                    navigate("/dashboard");
                    window.location.reload();
                }
              
            },
            (error) => {
              setMessage("Неверный логин и/или пароль")
            }
          );
        }
      };
    return (
            <Container className="parent container-auth">
                <Row className="auth-image-logo row-auth">
                    <Image  width={'80px'} src={logo}/>
                </Row>
                <Row className="row-auth">
                    <Col>
                        <Image className="auth-image" width={'800px'} src={logoPicture}/>
                    </Col>
                    <Col>
                        <div className='auth-inner'>
                            <h3 className="block-h3">Добро пожаловать!</h3>
                            <Form>
                                <Form.Group className="mb-2" controlId="">
                                    <Form.Control required name="login" placeholder='Введите логин' onChange={handleUsername}/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="">
                                    <Form.Control required name="password" type="password" placeholder='Введите пароль' onChange={handlePassword}/>
                                </Form.Group>
                            </Form>
                            <div><p className="warning-message">{message}</p></div>
                            <Button className="mt-2 auth-button" onClick={handleLogin}>
                                <div className='d-grid gap-2'>Войти</div>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
    )
}