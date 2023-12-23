import React, { useState, useEffect } from 'react'
import { ListGroup, Button, Modal, Form, Dropdown, Alert } from 'react-bootstrap'
import Select from 'react-select';
import '../App.css';
import axios from "axios"
import Header from '../Components/Header';

export default function ProjectsList(){
    const [flag, setFlag] = useState(false);
    const [project, setProject] = useState({
        id: 0,
        name: "",
        lead: {
            id:0,
            login:""
        },
        workflowSchema: 0,
        taskTypeSchema: 0
    });
    const [projects, setProjects] = useState([]);
    const [usersOptions, setUsers] = useState([]);
    const [users, setU] = useState([]);
    const [typesOptions, setTaskTypes] = useState([]);
    const [workflowsOptions, setWorkflows] = useState([]);
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const openNewProject = () => {
        setProject({
            id: 0,
            name: "",
            lead: {
                id:0,
                login:""
            },
            workflowSchema: 0,
            taskTypeSchema: 0
        })
        console.log(project)
        handleShow();
    }
    const saveProject = () =>{
        handleClose();

        axios.post(`http://localhost:5788/api/projects/save`, project)
            .then((res) => {
                setFlag(!flag)
            }).catch((error) => {
                console.log(error)
            });

        //setUser({})
    }

    const showDeleteAlert = (project) => {
        setShowAlert(true)
    }

    const editProject = (project) => {
        setProject(project);
        setShow(true);
    }

    const deleteProject = id =>{
        axios.get(`http://localhost:5788/api/projects/delete/` + Number(id))
            .then(response => {
                setProjects(response.data);
                setFlag(!flag)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        let data = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get(`http://localhost:5788/api/projects/all`, data)
            .then(response => {
                setProjects(response.data);
                //setFlag(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [flag])

    useEffect(() => {
        let data = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get(`http://localhost:5788/api/users/all`, data)
            .then(response => {
                setU(response.data)
                const opt = response.data.map((element) => {
                    return {label: element.username, value: element.id}
                })
                console.log(opt)
                setUsers(opt);
                //setFlag(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [show])

    useEffect(() => {
        let data = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get(`http://localhost:5788/api/tasktype/schemas`, data)
            .then(response => {

                const opt = response.data.map((element) => {
                    return {label: element.name, value: element.id}
                })
                console.log(opt)
                setTaskTypes(opt);
                //setFlag(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [show])

    useEffect(() => {
        let data = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get(`http://localhost:5788/api/workflow/schemes`, data)
            .then(response => {

                const opt = response.data.map((element) => {
                    return {label: element.name, value: element.id}
                })
                console.log(opt)
                setWorkflows(opt);
                //setFlag(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [show])

    useEffect(() => {
        let data = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get(`http://localhost:5788/api/projects/all`, data)
            .then(response => {
                setProjects(response.data);
                //setFlag(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [flag])

    const handleName = event => {
        project.name = event.target.value;
    }

    const handleLead = val => {
        let selectedUser = users.find(e => e.id == val.value);
        project.lead = selectedUser;
    }

    const handleTypesSchema = val =>{
        project.taskTypeSchema = {
            id: Number(val.value),
            name: val.label
        };
        console.log(project)
    }

    const handleWorkflowSchema = val =>{
        project.workflowSchema = {
            id: Number(val.value),
            name: val.label
        };
        console.log(project)
    }

        return (
            <>
            <Header/>
            <div className='content-main'>
                <div className="flexClass">
                    <h1>Список проектов</h1>
                    
                    <Button bg="primary" className='leftPosition' onClick={openNewProject}> Создать новый проект</Button>
                </div>
                <ListGroup as="ol" numbered className="content">
                    {projects.map(project => (
                        project.id !== 1 &&
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">{project.name}</div>
                            <div><b>Менеджер:</b> {project.lead.displayName}</div>
                            <div><b>Схема типов:</b> {project.taskTypeSchema.name}</div>
                            <div><b>Схема рабочего процесса:</b> {project.workflowSchema.name}</div>
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                    Действия
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => editProject(project)}>Редактировать</Dropdown.Item>
                                    <Dropdown.Item onClick={() => deleteProject(project.id)}>Удалить</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ListGroup.Item>
                    
                    ))}
                </ListGroup>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{project !== undefined ? 'Редактирование' : 'Создание нового' } проекта</Modal.Title>    
                    </Modal.Header>   
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-2" controlId="">
                                <Form.Label> Название </Form.Label>
                                <Form.Control placeholder='Введите название проекта' onChange={handleName} defaultValue={project !== undefined ? project.name : ""}/>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="">
                                <Form.Label> Менеджер </Form.Label>
                                <Select
                                    options={usersOptions}
                                    onChange={handleLead}
                                    defaultValue={project !== undefined ? usersOptions.find(e => e.value == project.lead.id) : ""}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="">
                                <Form.Label> Схема типов </Form.Label>
                                <Select
                                    options={typesOptions}
                                    onChange={handleTypesSchema}
                                    defaultValue={project !== undefined ? typesOptions.find(e => e.value == project.taskTypeSchema.id) : ""}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="">
                                <Form.Label> Схема рабочего процесса </Form.Label>
                                <Select
                                    options={workflowsOptions}
                                    onChange={handleWorkflowSchema}
                                    defaultValue={project !== undefined ? workflowsOptions.find(e => e.value == project.workflowSchema.id) : ""}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body> 
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={saveProject}>
                        Сохранить
                    </Button>
                    </Modal.Footer>
                </Modal>             
            </div>
            </>
        )
    }