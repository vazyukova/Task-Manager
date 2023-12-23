import React, { useState, useEffect} from 'react'
import { useParams, Link } from "react-router-dom";
import {Button, Table, Modal, Form} from 'react-bootstrap'
import Select from 'react-select';
import {TiDeleteOutline} from 'react-icons/ti'
import axios from "axios"
import '../../css/user-style.css';
import avatar from "../../images/avatar.svg"
import LeftMenu from '../../Components/left-menu';

export default function UserSingleProject(){
    const params = useParams();
    const [flag, setFlag] = useState(false);
    const [show, setShow] = useState(false);
    const [showTask, setShowTask] = useState(false);

    const [nonProjectUsers, setNonProjectUsers] = useState([])
    const [user, setUser] = useState({})
    const [projectObject, setProjectObject] = useState({})
    const [project, setProject] = useState({
        "id": "",
        "name": "",
        "participants": [
        ],
        "tasks":[
        ],
        "taskTypeSchema":{
            taskTypes:[]
        },
        "priorities": []
    });
    const [newTask, setNewTask] = useState({})

    const handleClose = () => setShow(false);

    useEffect(() => {
        let data = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get(`http://localhost:5788/api/projects/projectDetails/${params.id}`, data)
            .then(response => {
                setProject(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

            axios.get(`http://localhost:5788/api/projects/${params.id}`)
            .then(response => {
                setProjectObject(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [flag])

    const showUserPicker = () => {
        axios.get(`http://localhost:5788/api/projects/getUsersNotInProject/${params.id}`)
            .then(response => {
                setNonProjectUsers(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
        setShow(true);
    }

    const showCreateTask = () => {
        setShowTask(true);
    }

    const handleCloseTask = () => {
        setShowTask(false)
    }

    const saveParticipant = () => {
        setShow(false);
        console.log(user);
        let participant = {
            userId: user.id,
            projectId: project.projectId}
        console.log(participant)
        axios.post(`http://localhost:5788/api/projects/participants/add`, participant)
            .then(response => {
                setFlag(!flag);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const saveTask = () => {
        newTask.project = projectObject;
        newTask.status = project.workflowSchema.statusBeans.find(e => e.ordering == 0).status
        newTask.checked = false;
        axios.post(`http://localhost:5788/api/projects/saveTask`, newTask)
            .then(response => {
                setShowTask(false)
            })
            .catch((error) => {
                console.log(error)
            })
        setShowTask(false)
        setFlag(!flag)
      };

    const removeParticipant = id => {
        axios.get(`http://localhost:5788/api/projects/participants/delete?userId=${id}&projectId=${project.projectId}`)
            .then(response => {
                setFlag(!flag);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleUser = event => {
        setUser(nonProjectUsers.find(e => e.id == event.target.value));
    }

    const handleTaskName = event => {
        newTask.name = event.target.value
    }

    const handleAssignee = event => {
        newTask.assignee = project.participants.find(e => e.id == Number(event.target.value));
    }

    const handleType = event => {
        newTask.type = project.taskTypeSchema.taskTypes.find(e => e.id == Number(event.target.value));
    }

    const handleDescription = (event) => {
        newTask.description = event.target.value;
    }

    const handlePriority = (event) => {
        newTask.priority = project.priorities.find(e => e.id == Number(event.target.value));
    }

        return (
            <>
                <div className="container-dashboard">
                    <LeftMenu Active="PROJECTS"/>
                    <div className="content">
                        <div className="header display-flex">
                            <h1>{project.name}</h1>
                            <Button className='big-button ml-auto' onClick={showCreateTask}>Добавить задачу</Button>
                        </div>
                        <div className="dashboard-content">
                            <Table className="main-table">
                                {project.tasks.map(task => (
                                    <tr>
                                        <div className="display-flex">
                                            <div>
                                                <Link to={`/user/task/${task.id}`}>{task.name}</Link>
                                                <div className="ml-auto">{task.assignee.displayName}</div>
                                            </div>
                                            <div className="label ml-auto">{task.status.name}</div>
                                        </div>
                                    </tr>
                                ))}
                            </Table>
                        </div>
                    </div>
                    <div className="right-panel display-grid-with-header">
                        <div className="right-header center-horizontal header-with-button">
                            <span>Участники</span>
                            <Button className = "very-small-button ml-auto" onClick={showUserPicker}>+</Button>
                        </div>
                        <div className="center-horizontal">
                            <Table className="main-table participants-table">
                                {project.participants.map(part =>(
                                    <tr className="participant-label">
                                        <div className="display-flex">
                                        <img
                                            src={avatar}
                                            height="35"
                                            width="35"
                                            className="d-inline-block align-top"
                                            alt='avatar'
                                        />
                                            <span>{part.displayName}</span>
                                            <TiDeleteOutline className="ml-auto cursor-pointer" color="grey" size="35px" onClick={() => removeParticipant(part.id)}/>
                                        </div>
                                    </tr>
                                ))}
                            </Table>
                        </div>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавление участника</Modal.Title>    
                    </Modal.Header>   
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="">
                                <Form.Label> Выберите участника </Form.Label>
                                <Form.Select placeholder="Выберите пользователя" mt={1} onChange={handleUser}>
                                        {nonProjectUsers.map(u => (
                                            <option label={u.displayName} value={String(u.id)} />
                                        ))}
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Modal.Body> 
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={saveParticipant}>
                        Сохранить
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showTask} onHide={handleCloseTask}>
                    <Modal.Header closeButton>
                        <Modal.Title>Создание новой задачи</Modal.Title>    
                    </Modal.Header>   
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-2" controlId="">
                                <Form.Label> Название </Form.Label>
                                <Form.Control placeholder='Введите название задачи' onChange={handleTaskName}/>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="">
                                <Form.Label> Ответственный </Form.Label>
                                <Form.Select minWidth="600" placeholder="Выберите пользователя" mt={1} onChange={handleAssignee}>
                                        {project.participants.map(u => (
                                            <option label={u.displayName} value={String(u.id)} />
                                        ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="">
                                <Form.Label> Тип </Form.Label>
                                <Form.Select minWidth="300" placeholder="Выберите тип" mt={1} onChange={handleType}>
                                        {project.taskTypeSchema.taskTypes.map(t => (
                                            <option label={t.name} value={String(t.id)} />
                                        ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="">
                                <Form.Label> Приоритет </Form.Label>
                                <Form.Select minWidth="300" placeholder="Выберите приоритет" mt={1} onChange={handlePriority}>
                                        {project.priorities.map(p => (
                                            <option label={p.name} value={String(p.id)} />
                                        ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="" onChange={handleDescription}>
                                <Form.Label> Описание </Form.Label>
                                <Form.Control minWidth="300" placeholder="Введите описание" as="textarea" rows={3} mt={1}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body> 
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseTask}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={saveTask}>
                        Сохранить
                    </Button>
                    </Modal.Footer>
                </Modal>       
            </>
        )
    }