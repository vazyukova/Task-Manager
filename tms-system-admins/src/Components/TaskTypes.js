import React, { useState, useEffect } from 'react'
import { ListGroup, Button, Modal, Form, Dropdown } from 'react-bootstrap'
import '../App.css';
import axios from 'axios'

export default function TaskTypes(){
    const [taskTypes, setTaskTypes] = useState([])
    const [tasktype, setTasktype] = useState({})
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
        axios.get(`http://localhost:5788/api/tasktype/tasktypes`, data)
            .then(response => {
                setTaskTypes(response.data);
                //setFlag(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [flag])

    const saveTaskType = () =>{
        handleClose();

        axios.post(`http://localhost:5788/api/tasktype/saveTaskType`, tasktype)
            .then((res) => {
                console.log(res.data)
                setFlag(!flag)
            }).catch((error) => {
                console.log(error)
            });

        //setUser({})
    }
    const deleteTaskType = id =>{
        axios.get(`http://localhost:5788/api/tasktype/deleteTaskType/` + Number(id))
            .then(response => {
                setTaskTypes(response.data);
                setFlag(!flag)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleName = event => {
        tasktype.name = event.target.value;
    }

        return (
            <div className='content main'>
                <div className="flexClass">
                    <h1>Типы задач</h1>
                    <Button bg="primary" className='leftPosition' onClick={handleShow}> Создать новый тип</Button>
                </div>
                <ListGroup as="ol" numbered className="content">
                    {taskTypes.map(taskType => (
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">{taskType.name}</div>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                Действия
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Редактировать</Dropdown.Item>
                                <Dropdown.Item onClick={() => deleteTaskType(taskType.id)}>Удалить</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Создание нового типа</Modal.Title>    
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
                    <Button variant="primary" onClick={saveTaskType}>
                        Сохранить
                    </Button>
                    </Modal.Footer>
                </Modal>                
            </div>
        )
    }