import React, { useState, useEffect } from 'react'
import { ListGroup, Button, Modal, Form, Dropdown } from 'react-bootstrap'
import '../App.css';
import axios from 'axios'

export default function Statuses(){
    const [statuses, setStatuses] = useState([])
    const [status, setStatus] = useState({})
    const [flag, setFlag] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    useEffect(() => {
        let data = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get(`http://localhost:5788/api/workflow/statuses`, data)
            .then(response => {
                setStatuses(response.data);
                //setFlag(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [flag])

    const saveStatus = () =>{
        handleClose();

        axios.post(`http://localhost:5788/api/workflow/saveStatus`, status)
            .then((res) => {
                console.log(res.data)
                setFlag(!flag)
            }).catch((error) => {
                console.log(error)
            });

        //setUser({})
    }
    const deleteStatus = id =>{
        axios.get(`http://localhost:5788/api/workflow/deleteStatus/` + Number(id))
            .then(response => {
                setStatuses(response.data);
                setFlag(!flag)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleName = event => {
        status.name = event.target.value;
    }

        return (
            <div className='content main'>
                <div className="flexClass">
                    <h1>Состояния</h1>
                    <Button bg="primary" className='leftPosition' onClick={handleShow}> Создать новое состояние</Button>
                </div>
                <ListGroup as="ol" numbered className="content">
                    {statuses.map(s => (
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">{s.name}</div>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                Действия
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Редактировать</Dropdown.Item>
                                <Dropdown.Item onClick={() => deleteStatus(s.id)}>Удалить</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Создание нового состояния</Modal.Title>    
                    </Modal.Header>   
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="">
                                <Form.Label> Название </Form.Label>
                                <Form.Control placeholder='Введите название типа' onChange={handleName}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body> 
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={saveStatus}>
                        Сохранить
                    </Button>
                    </Modal.Footer>
                </Modal>                
            </div>
        )
    }