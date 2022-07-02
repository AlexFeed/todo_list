import {useEffect, useRef, useState} from "react";

import {Checkbox} from 'pretty-checkbox-react';

import checkboxImg from './../../images/checkbox.png'
import './todoItem.css';
import '@djthoms/pretty-checkbox';


const TodoItem = ({text, isCompleted, id, onCheckboxChanged, handleDelete, changeTodoItemGlobalText}) => {
    const [editMode, setEditMode] = useState(false);
    const [inputLocalText, setInputLocalText] = useState(text);

    const editInputRef = useRef();

    useEffect(() => {
        if (editInputRef.current && editMode === true) {
            editInputRef.current.setSelectionRange(inputLocalText.length, inputLocalText.length);
            editInputRef.current.focus();
        }
    }, [editMode]);

    const onEditModeSwitchedOff = () => {
        setEditMode(false);

        changeTodoItemGlobalText(id, inputLocalText);
    }

    const onEditModeSwitchedOn = () => {
        setEditMode(true);

        setInputLocalText(text);
    }

    const onEnterDown = (e) => {
        if (e.key === 'Enter') {
            onEditModeSwitchedOff()
        }
    }

    const editInput = (
        <>
            <input type="text" value={inputLocalText}
                   onChange={(e) => setInputLocalText(e.target.value)}
                   onKeyDown={onEnterDown} onBlur={onEditModeSwitchedOff}
                   ref={editInputRef}
                   className="edit__input"/>
        </>
    )

    const todoContent = (
        <>
            <Checkbox checked={isCompleted}
                      onChange={() => onCheckboxChanged(id)}
                      className="todoItem__checkbox no_highlights" animation="smooth" shape={'round'}
                      icon={<img src={checkboxImg} alt="check mark"/>}/>
            <label onClick={onEditModeSwitchedOn}
                   className={`todoItem__text ${isCompleted ? 'labelAnimation' : ''}`}>{text}</label>
            <button onClick={() => handleDelete(id)} className="todoItem__delete"/>
        </>
    )

    const content = editMode ? editInput : todoContent;
    return (
        <li className="todoItem">
            {content}
        </li>
    )
}

export default TodoItem;