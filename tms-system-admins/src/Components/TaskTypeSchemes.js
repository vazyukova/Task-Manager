import React, { useState, useEffect } from 'react'
import { ListGroup, Button, Modal, Form, Dropdown} from 'react-bootstrap'
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'
import axios from 'axios'
import '../App.css';

export default function TaskTypeSchemes(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [typesOptions, setTypesOptions] = useState([]);
    const [flag, setFlag] = useState(false);
    const [schemes, setSchemes] = useState([]);
    const [schema, setSchema] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState("");

    const options  = [
        { label:  'Дефект', value:  'option_1'  },
        { label:  'Задача', value:  'option_2'  },
        { label:  'Дизайн', value:  'option_3'  },
        { label:  'Тестирование', value:  'option_4'  },
    ]

    useEffect(() => {
        let data = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get(`http://localhost:5788/api/tasktype/tasktypes`, data)
            .then(response => {

                const opt = response.data.map((element) => {
                    return {label: element.name, value: element.id}
                })
                setTypesOptions(opt);
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
                setSchemes(response.data);
                //setFlag(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [flag])

    const handleTypes = val =>
    {
        setSelectedTypes(val);
    }

    const handleName = event => {
        schema.name = event.target.value;
    }

    const saveTaskTypeScheme = () =>{
        handleClose();
        let tt = selectedTypes.split(',').map((elem) => {
            return {id: elem, name: typesOptions.find(e => e.value == elem).label}
        })
        let s = {
            name: schema.name,
            taskTypes: tt
        }
        axios.post(`http://localhost:5788/api/tasktype/saveSchema`, s)
            .then((res) => {
                console.log(res.data)
                setFlag(!flag)
            }).catch((error) => {
                console.log(error)
            });
    }

    const deleteSchema = id =>{
        axios.get(`http://localhost:5788/api/tasktype/deleteSchema/` + Number(id))
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
                    <h1>Схемы типов задач</h1>
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
                            {schema.taskTypes.map(tt => (
                                <div>{tt.name}</div>
                            ))}
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                    Действия
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Редактировать</Dropdown.Item>
                                    <Dropdown.Item onClick={() => deleteSchema(schema.id)}>Удалить</Dropdown.Item>
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
                                <Form.Label> Выберите типы для данного проекта </Form.Label>
                                <MultiSelect
                                    className="multiselectStyle"
                                    options={typesOptions}
                                    onChange={handleTypes}
                                />
                            </Form.Group>
                            
                        </Form>
                        
                    </Modal.Body> 
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={saveTaskTypeScheme}>
                        Сохранить
                    </Button>
                    </Modal.Footer>
                </Modal>                
            </div>
        )
    }