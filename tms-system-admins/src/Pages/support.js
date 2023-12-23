import React, { useState, useEffect } from 'react'
import { ListGroup, Button, Modal, Form, Dropdown, Alert } from 'react-bootstrap'
import Select from 'react-select';
import '../App.css';
import axios from "axios"
import Header from '../Components/Header';

export default function Support(){
    const [flag, setFlag] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        let data = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get(`http://localhost:5788/api/projects/1/tasks`, data)
            .then(response => {
                setTasks(response.data[1].tasks);
                console.log(response.data[1])
                //setFlag(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [flag])

    const doneTask = (task) => {
        axios.get("http://localhost:5788/api/projects/moveTask/" + task.id)
            .then(response => {
                setFlag(!flag)
            })
    }

        return (
            <>
            <Header/>
            <div className='content-main'>
                <div className="flexClass">
                    <h1>Техническая поддержка</h1>
                </div>
                <ListGroup as="ol" numbered className="content">
                    {tasks.map(task => (
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">{task.name}</div>
                            <div>{task.description}</div>
                            </div>
                            <Button onClick={() => doneTask(task)}>Выполнено</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                            
            </div>
            </>
        )
    }