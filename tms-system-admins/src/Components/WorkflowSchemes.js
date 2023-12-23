import React, { useState, useEffect } from 'react'
import { ListGroup, Button, Modal, Form, Dropdown} from 'react-bootstrap'
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'
import '../App.css';
import axios from 'axios';

export default function TaskTypeSchemes(){
    const [schemes, setSchemes] = useState([])
    const [schema, setSchema] = useState({});
    const [statusesValue, setValue] = useState("")
    const [statusesOptions, setStatusesOptions] = useState([])
    const [show, setShow] = useState(false);
    const [flag, setFlag] = useState(false);
    const handleClose = () => {setValue(""); setShow(false);}
    const handleShow = () => setShow(true)

    const options  = [
        { label:  'Открыто', value:  'Открыто'  },
        { label:  'В процессе', value:  'В процессе'  },
        { label:  'Закрыто', value:  'Закрыто'  },
    ]

    useEffect(() => {
        let data = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get(`http://localhost:5788/api/workflow/schemes`, data)
            .then(response => {
                setSchemes(response.data);
                console.log(response.data)
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
        axios.get(`http://localhost:5788/api/workflow/statuses`, data)
            .then(response => {

                const opt = response.data.map((element) => {
                    return {label: element.name, value: element.id}
                })
                setStatusesOptions(opt);
                //setFlag(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [show])

    const handleStatuses = val =>
    {
        setValue(val);
    }

    const handleName = event => {
        schema.name = event.target.value;
    }

    const saveWorkflowScheme = () =>{
        handleClose();
        let tt = statusesValue.split(',').map((elem, index) => {
            return {
                status :{
                    id: elem,
                    name: statusesOptions.find(e => e.value == elem).label
                },
                ordering:index
            }
        })
        let s = {
            name: schema.name,
            statusBeans: tt
        }
        axios.post(`http://localhost:5788/api/workflow/saveSchema`, s)
            .then((res) => {
                console.log(res.data)
                setFlag(!flag)
            }).catch((error) => {
                console.log(error)
            });
    }

    const deleteSchema = id =>{
        axios.get(`http://localhost:5788/api/workflow/deleteSchema/` + Number(id))
            .then(response => {
                setSchemes(response.data);
                setFlag(!flag)
            })
            .catch((error) => {
                console.log(error);
            })
    }

        return (
            <div className='content main'>
                <div className="flexClass">
                    <h1>Схемы рабочего процесса</h1>
                    <Button bg="primary" className='leftPosition' onClick={handleShow}> Создать новую схему</Button>
                </div>
                <ListGroup as="ol" numbered className="content">
                    {schemes.map(schema => (
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">{schema.name}</div>
                        {schema.statusBeans.map(s => (
                            <div>{s.ordering}. {s.status.name}</div>
                        ))}
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                Действия
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Редактировать</Dropdown.Item>
                                <Dropdown.Item onClick={() => {deleteSchema(schema.id)}}>Удалить</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Создание новой схемы</Modal.Title>    
                    </Modal.Header>   
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-2" controlId="">
                                <Form.Label> Название </Form.Label>
                                <Form.Control placeholder='Введите название схемы' onChange={handleName}/>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="">
                                <Form.Label> Выберите состояния для данного проекта </Form.Label> <br/>
                                <MultiSelect
                                    onChange = {handleStatuses}
                                    className="multiselectStyle"
                                    options={statusesOptions}
                                />
                                <Form.Text className="text-muted">Выбирайте состояния в том порядке, в котором они должны быть доступны в задаче</Form.Text>
                                
                            </Form.Group>
                            
                        </Form>
                        
                    </Modal.Body> 
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={saveWorkflowScheme}>
                        Сохранить
                    </Button>
                    </Modal.Footer>
                </Modal>                
            </div>
        )
    }