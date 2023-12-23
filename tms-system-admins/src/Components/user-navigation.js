import React, { Component } from 'react'
import {Tab, Nav, Col, Row, Container, Navbar} from 'react-bootstrap'

export default class UserNavigation extends Component {
    render() {
        return (
            <>
            <Container>
                <Row>
                    <div>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                            <Row>
                                <Col sm={2}>
                                <Nav variant="pills" className="flex-column tabsStyle main-left-navigation">
                                    <Nav.Item>
                                    <Nav.Link eventKey="first" className="new-primary-color" >Профиль</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <Nav.Link href="/dashboard" className="new-primary-color">Дашборд</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <Nav.Link eventKey="third" className="new-primary-color">Мои проекты</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <Nav.Link eventKey="fouth" className="new-primary-color">Мои задачи</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                </Col>
                            </Row>
                            </Tab.Container>
                        </div>
                        <div className="main-top-navigation">
                            <Navbar collapseOnSelect className="container-header-top" variant="dark">
                                <Container className="container-header-top">
                                    <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="mr-auto">
                                            <Nav.Link className="color-primary" href="/users"> Пользователи </Nav.Link>
                                            <Nav.Link className="color-primary" href="/support">Поддержка</Nav.Link>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                        </div>
                    </Row>
                </Container>
            </>
        )
    }
}