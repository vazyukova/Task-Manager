import React, { Component } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

import logo from '../images/logo.svg'

export default class Header extends Component {
    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="md" className="container-header" variant="dark">
                    <Container className="container-header">
                        <Navbar.Brand href="/">
                            <img
                                src={logo}
                                height="35"
                                width="75"
                                className="d-inline-block align-top"
                                alt='logo'
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            <NavDropdown title="Проекты" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/">Список проектов</NavDropdown.Item>
                                <NavDropdown.Item href="/workflowschemes">Схемы рабочего процесса</NavDropdown.Item>
                                <NavDropdown.Item href="/tasktypeschemes">Схемы типов задач</NavDropdown.Item>
                            </NavDropdown>
                                <Nav.Link href="/users"> Пользователи </Nav.Link>
                                <Nav.Link href="/support">Поддержка</Nav.Link>
                                <Nav.Link href="/dashboard">Вернуться в режим пользователя</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                
            </>
        )
    }
}