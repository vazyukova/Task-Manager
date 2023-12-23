import React, { useState, useEffect } from 'react'
import {Button, Table, Dropdown} from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";
import axios from "axios"
import '../../css/user-style.css';
import LeftMenu from '../../Components/left-menu';

export default function Task(){
    const params = useParams();
    const [flag, setFlag] = useState(false);
    const [task, setTask] = useState({
        "name": "",
        "assignee": {
            "displayName": ""
        },
        "priority":{
            "name": ""
        },
        "type": {
            "name": ""
        }
    });

    useEffect(() => {
        let data = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get(`http://localhost:5788/api/projects/task/${params.id}`, data)
            .then(response => {
                setTask(response.data);
                //setFlag(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [flag])

        return (
            <>
                <div className="container-dashboard">
                    <LeftMenu Active="PROJECTS"/>
                    <div className="content">
                        <div className="header-with-button">
                            <h1>{task.name}</h1>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" className="dropdown-button">
                                    Действия
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Редактировать</Dropdown.Item>
                                    <Dropdown.Item>Удалить</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="task-content">
                            <div>
                                <div className="right-part-task">
                                    <div className="bold">Ответственный:</div>
                                    <div>{task.assignee.displayName}</div>
                                </div>
                                <div className="right-part-task">
                                    <div className="bold">Приоритет:</div>
                                    <div>{task.priority.name}</div>
                                </div>
                                <div className="right-part-task">
                                    <div className="bold">Описание:</div>
                                    <div>{task.description}</div>
                                </div>
                            </div>
                            <div>
                                <div className="left-part-task">
                                        <div className="bold center-vertical">Статус:</div>
                                        <div className="label">{task.type.name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-panel">
                        <span className="right-header center-horizontal header-with-button">Оценка времени</span>
                    </div>
                </div>
            </>
        )
    }