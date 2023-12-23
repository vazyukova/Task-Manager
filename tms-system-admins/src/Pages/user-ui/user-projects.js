import React, { useState, useEffect } from 'react'
import {Button, Table} from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from "axios"
import '../../css/user-style.css';
import LeftMenu from '../../Components/left-menu';

export default function Projects(){
    const [flag, setFlag] = useState(false);
    const [projects, setProjects] = useState([]);

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

        return (
            <>
                <div className="container-main">
                    <LeftMenu Active="PROJECTS"/>
                    <div className="content">
                        <div className="header-with-button">
                            <h1>Мои проекты</h1>
                            <Button bg="primary" className='big-button'>Запросить проект</Button>
                        </div>
                        <div className="projects-content">
                            <Table className="main-table">
                                <thead>
                                <tr>
                                    <th>Название проекта</th>
                                    <th>Ответственный</th>
                                </tr>
                                </thead>
                                <tbody>
                                {projects.map(project => (
                                    project.id !== 1 &&
                                    <tr>
                                        <td>
                                            <Link to={`/user/project/${project.id}`}>
                                                {project.name}
                                            </Link>
                                        </td>
                                        <td>{project.lead.displayName}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </>
        )
    }