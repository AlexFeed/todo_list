import {useEffect, useRef, useState} from "react";

import './todoItem.css';


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
            <input checked={isCompleted} onChange={() => onCheckboxChanged(id)}
                   type="checkbox" className="todoItem__checkbox"/>
            <label onDoubleClick={() => setEditMode(true)}
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