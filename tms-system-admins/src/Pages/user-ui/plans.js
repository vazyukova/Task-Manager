import React, { useState, useEffect } from 'react'
import '../../css/user-style.css';
import edit from "../../images/edit.svg"
import LeftMenu from '../../Components/left-menu';

export default function Plans(){

        return (
            <>
                <div className="container-main">
                <LeftMenu Active="PLANS"/>
                    <div className="content">
                        <div className="header-with-button">
                            <h1>Мои планы</h1>
                            <select className="selection-dropdown">
                                <option value="" disabled="disabled" selected="selected">Выберите проект</option>
                                <option value="1">Проект 1</option>
                                <option value="2">Проект 2</option>
                            </select>
                        </div>
                        <div className="plans-content">
                                <div className="plan-card active">
                                    <div className="plan-header">
                                        <p className="plan-card-h1">План №1</p>
                                        <img src={edit}/>
                                    </div>
                                    <p className="label">В процессе</p>
                                    <p>21.08.2023 - 12.09.2023</p>
                                    <p>Проект 1</p>
                                    <p>Решено задач: <b>34 из 50</b></p>
                                    <div className="width-max">
                                        <button class="small-button center-horizontal">Завершить</button>
                                    </div>
                                </div>
                            <div className="plan-card">
                                <div class="plan-header">
                                    <p className="plan-card-h1">План №1</p>
                                    <img src={edit}/>
                                </div>
                                <p className="label">Открыт</p>
                                <p>21.08.2023 - 12.09.2023</p>
                                <p>Проект 1</p>
                                <p>Решено задач: <b>34 из 50</b></p>
                                <div className="width-max">
                                    <button class="small-button center-horizontal">Начать</button>
                                </div>
                            </div>
                            <div className="plan-card">
                                <div className="plan-header">
                                    <p className="plan-card-h1">План №1</p>
                                    <img src={edit}/>
                                </div>
                                <p className="label">Открыт</p>
                                <p>21.08.2023 - 12.09.2023</p>
                                <p>Проект 1</p>
                                <p>Решено задач: <b>34 из 50</b></p>
                                <div className="width-max">
                                    <button class="small-button center-horizontal">Начать</button>
                                </div>
                            </div>
                            <div className="plan-card">
                                <div className="plan-header">
                                    <p className="plan-card-h1">План №1</p>
                                    <img src={edit}/>
                                </div>
                                <p className="label">Открыт</p>
                                <p>21.08.2023 - 12.09.2023</p>
                                <p>Проект 1</p>
                                <p>Решено задач: <b>34 из 50</b></p>
                                <div className="width-max">
                                    <button class="small-button center-horizontal">Начать</button>
                                </div>
                            </div>
                            <div className="plan-card">
                                <div className="plan-header">
                                    <p className="plan-card-h1">План №1</p>
                                    <img src={edit}/>
                                </div>
                                <p className="label">Открыт</p>
                                <p>21.08.2023 - 12.09.2023</p>
                                <p>Проект 1</p>
                                <p>Решено задач: <b>34 из 50</b></p>
                                <div className="width-max">
                                    <button class="small-button center-horizontal">Начать</button>
                                </div>
                            </div>
                            <div className="plan-card">
                                <div class="plan-header">
                                    <p className="plan-card-h1">План №1</p>
                                    <img src={edit}/>
                                </div>
                                <p className="label">Открыт</p>
                                <p>21.08.2023 - 12.09.2023</p>
                                <p>Проект 1</p>
                                <p>Решено задач: <b>34 из 50</b></p>
                                <div className="width-max">
                                    <button class="small-button center-horizontal">Начать</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }