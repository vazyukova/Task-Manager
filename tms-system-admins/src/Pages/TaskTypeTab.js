import React, { useState } from 'react'
import { Tab, Row, Col, Nav } from 'react-bootstrap'
import '../App.css';
import TaskTypes from "../Components/TaskTypes"
import TaskTypeSchemes from "../Components/TaskTypeSchemes"
import Header from '../Components/Header';

export default function TaskTypeTab(){

        return (
            <>
            <Header/>
            <div className='content-main'>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <Row>
                    <Col sm={2}>
                    <Nav variant="pills" className="flex-column tabsStyle">
                        <Nav.Item>
                        <Nav.Link eventKey="first" className="new-primary-color" >Схемы</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second" className="new-primary-color">Типы</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <TaskTypeSchemes/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <TaskTypes/>
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>              
            </div>
            </>
        )
    }