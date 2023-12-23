import React, { useState, useEffect } from 'react'
import '../../css/user-style.css';
import persent from "../../images/persent.svg"

import LeftMenu from '../../Components/left-menu';

export default function Dashboard(){
    const [value, setValue] = useState("DASHBOARD")

        return (
            <>
                <div className="container-dashboard">
                    <LeftMenu Active="DASHBOARD"/>
                    <div className="content">
                        <div className="header">
                            <h1>Моя статистика</h1>
                            <select className="dropdown-without-border">
                                <option value="">План 14 Авг - 30 Авг</option>
                                <option value="1">План 1 Сен - 14 Сен</option>
                                <option value="2">План 15 Сен - 30 Сен</option>
                            </select>
                        </div>
                        <div className="dashboard-content">
                            <div className="dashboard-line">
                                <div className="main-info">
                                    <div className="icon center-vertical"><img src={persent}/></div>
                                    <div className="icon center-vertical">
                                        <div>задач решено</div>
                                        <p className="main-info-h1">12 из 30</p>
                                    </div>
                                </div>
                                <div className="main-info">
                                    <div className="icon center-vertical"><img src={persent}/></div>
                                    <div className="icon center-vertical">
                                        <div>часов затрачено</div>
                                        <p className="main-info-h1">12 из 30</p>
                                    </div>
                                </div>
                                <div className="main-info">
                                    <div className="icon center-vertical"><img src={persent}/></div>
                                    <div className="icon center-vertical">
                                        <div>задач начато</div>
                                        <p className="main-info-h1">12 из 30</p>
                                    </div>
                                </div>
                            </div>
                            <div className="big-gadget">
                                <div className="center-horizontal center-vertical">Что-то еще</div>
                            </div>
                            <div className="dashboard-line">
                                <div className="small-gadget">
                                    <div className="center-horizontal center-vertical">Раз</div>
                                </div>
                                <div className="small-gadget">
                                    <div className="center-horizontal center-vertical">Два</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-panel">
                        <input type="date" className="dropdown-without-border center-horizontal"/>
                    </div>
                </div>
            </>
        )
    }