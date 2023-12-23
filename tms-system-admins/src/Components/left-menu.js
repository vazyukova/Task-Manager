import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

import logo from "../images/logo.svg"
import dashboard from "../images/dashboard.svg"
import plans from "../images/plans.svg"
import projects from "../images/projects.svg"
import tasks from "../images/tasks.svg"
import notifications from "../images/notifications.svg"
import settings from "../images/settings.svg"
import avatar from "../images/avatar.svg"

export default function LeftMenu({Active}){
        return (
            <>
                <div className="menu-container">
                    <img className="center-horizontal logo" src={logo}/>
                    <nav className="menu center-horizontal">
                        <ul>
                            <NavLink to="/dashboard">
                                <li className={Active==="DASHBOARD" ? "menu-item selected" : "menu-item"}>
                                    <img className="icon center-vertical" src={dashboard}/>
                                    <span className="center-vertical">Статистика</span>
                                </li>
                            </NavLink>
                            <NavLink to="/plans">
                                <li className={Active==="PLANS" ? "menu-item selected" : "menu-item"}>
                                    <img className="icon center-vertical" src={plans}/>
                                    <span className="center-vertical">Планы</span>
                                </li>
                            </NavLink>
                            <a href="/user/projects">
                                <li className={Active==="PROJECTS" ? "menu-item selected" : "menu-item"}>
                                    <img className="icon center-vertical" src={projects}/>
                                    <span className="center-vertical">Проекты</span>
                                </li>
                            </a>
                            <a>
                                <li className="menu-item">
                                    <img className="icon center-vertical" src={tasks}/>
                                    <span className="center-vertical">Задачи</span>
                                </li>
                            </a>
                            <a>
                                <li className="menu-item">
                                    <img className="icon center-vertical" src={notifications}/>
                                    <span className="center-vertical">Уведомления</span>
                                </li>
                            </a>
                            <NavLink to="/projects">
                                <li className="menu-item">
                                    <img className="icon center-vertical" src={settings}/>
                                    <span className="center-vertical">Настройки</span>
                                </li>
                            </NavLink>
                        </ul>
                    </nav>
                    <div className="profile-menu">
                        <div className="center-horizontal display-flex">
                            <img className="center-vertical avatar" src={avatar}/>
                            <span className="center-vertical">Вазюкова Галина</span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
