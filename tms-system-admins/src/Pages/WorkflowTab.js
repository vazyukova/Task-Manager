import React, { useState } from 'react'
import { Tab, Row, Col, Nav } from 'react-bootstrap'
import '../App.css';
import WorkflowSchemes from "../Components/WorkflowSchemes"
import Statuses from "../Components/Statuses"
import Header from '../Components/Header';

export default function WorkflowTab(){

        return (
            <>
            <Header/>
            <div className='content-main'>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <Row>
                    <Col sm={2}>
                    <Nav variant="pills" className="flex-column tabsStyle">
                        <Nav.Item>
                        <Nav.Link eventKey="first" className='new-primary-color'>Схемы</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second" className="new-primary-color">Состояния</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <WorkflowSchemes/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <Statuses/>
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>              
            </div>
            </>
        )
    }