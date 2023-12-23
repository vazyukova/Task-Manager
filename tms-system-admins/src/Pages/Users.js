import React, { Component, useEffect, useState } from 'react'
import { ListGroup, Button, Modal, Form, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import Select from 'react-select';
import '../App.css';
import Header from '../Components/Header'
export default function Users(){
    const API_URL = "http://localhost:5788/api/users/";
    const [flag, setFlag] = useState(true)
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({})
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [needEmail, setNeedEmail] = useState(true);
    const rolesOptions = [
        {value: "sys", label: "Системный администратор"},
        {value: "usr", label: "Пользователь"}
    ]

    const saveUser = () =>{
        handleClose();

        axios.post(API_URL + `save?isSendEmail=` + needEmail, user)
            .then((res) => {
                console.log(res.data)
                setFlag(!flag)
            }).catch((error) => {
                console.log(error)
            });

        //setUser({})
    }

    const deleteUser = id =>{
        console.log(user)
        axios.get(`http://localhost:5788/api/users/delete/` + Number(id))
            .then(response => {
                setUsers(response.data);
                setFlag(!flag)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleDisplayName = event => {
        user.displayName = event.target.value;
    }

    const handleEmail = event => {
        user.email = event.target.value;
    }

    const handleLogin = event => {
        user.username = event.target.value;
    }

    const handlePassword = event => {
        user.password = event.target.value;
    }

    const handleRole = val =>{
        user.role = val.value;
        console.log(user);
    }

    useEffect(() => {
        let data = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get(`http://localhost:5788/api/users/all`, data)
            .then(response => {
                setUsers(response.data);
                //setFlag(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [flag])

        return (
            <>
            <Header/>
            <div className='content-main'>
                <div className="flexClass">
                    <h1>Список пользователей</h1>
                    <Button bg="primary" className='leftPosition' onClick={handleShow}> Создать нового пользователя</Button>
                </div>
                <ListGroup as="ol" numbered className="content">
                    {users.map(user => (
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">{user.displayName}</div>
                                <div><b>Логин: </b>{user.username}</div>
                                <div><b>Почта: </b>{user.email}</div>

                            </div>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                    Действия
                                </Dropdown.Toggle>
            
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleShow}>Редактировать</Dropdown.Item>
                                    <Dropdown.Item onClick={() => deleteUser(user.id)}>Удалить</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Создание нового пользователя</Modal.Title>    
                    </Modal.Header>   
                    <Modal.Body onSubmit={saveUser}>
                        <Form>
                            <Form.Group className="mb-2" controlId="">
                                <Form.Label> Имя </Form.Label>
                                <Form.Control name="displayName" placeholder='Введите имя' onChange={handleDisplayName}/>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="fromBasicEmail">
                                <Form.Label> Электронная почта </Form.Label>
                                <Form.Control name="email" type="email" placeholder='Введите почту' onChange={handleEmail} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="">
                                <Form.Label> Логин </Form.Label>
                                <Form.Control name="login" placeholder='Введите логин' onChange={handleLogin}/>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="">
                                <Form.Label> Пароль </Form.Label>
                                <Form.Control name="password" type="password" placeholder='Введите пароль' onChange={handlePassword}/>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="">
                                <Form.Label> Роль </Form.Label>
                                <Select
                                    options={rolesOptions}
                                    onChange={handleRole}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Check type="checkbox" label="Отправить логин и пароль на почту" onChange={() => {setNeedEmail(!needEmail); console.log(needEmail)}}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body> 
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={saveUser}>
                        Сохранить
                    </Button>
                    </Modal.Footer>
                </Modal>                
            </div>
            </>
        )
    }
