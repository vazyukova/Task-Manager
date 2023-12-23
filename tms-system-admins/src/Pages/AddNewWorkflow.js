import React, { useState } from 'react'
import { ListGroup, Button, Modal, Form, Dropdown, DropdownButton} from 'react-bootstrap'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import '../App.css';
export default function WorkflowSchemes(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [state, setState] = useState(["hh"])


    const SortableItem = SortableElement(({value}) => <li className="sortElem">{value}</li>);

    const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
        {items.map((value, index) => (
            <SortableItem key={`item-${value}`} index={index} value={value} />
        ))}
        </ul>
    );
    });
    
    const onSortEnd = ({oldIndex, newIndex}) => {
        setState(
          arrayMove(state, oldIndex, newIndex)
        );
      };
    const bef = () => {
        setState(state)
    }
      const addItem = (item) =>{
          var tt = state;
          tt.push(item);
          setState(tt)
          //setState(newO)
      }

        return (
            <div className='content'>
                <div className="flexClass">
                    <h1>Схемы типов задач</h1>
                </div>
                        <Form>
                            <Form.Group controlId="">
                                <Form.Label> Название </Form.Label>
                                <Form.Control placeholder='Введите название проекта'/>
                                <Form.Text className="text-muted">Подсказка</Form.Text>
                            </Form.Group>
                            <Form.Group controlId="">
                                <Form.Label> Выберите типы для данного проекта </Form.Label>
                            </Form.Group>
                            
                        </Form>
                        <label for="dropdown-item-button">Добавить новое состояние</label>
                        
                    <Button variant="primary" onClick={handleClose}>
                        Сохранить
                    </Button>
                                   
            </div>
        )
    }