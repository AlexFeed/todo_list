import {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {useLocalStorage} from "@rehooks/local-storage";

import TodoItem from "../todoItem/TodoItem";

import './App.css';


function App() {
    const [data, setData] = useLocalStorage('data', [])

    const [inputText, setInputText] = useState('');

    const getWeekDay = (date) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return days[date.getDay()]
    }

    const [weekDay, setWeekDay] = useState(getWeekDay(new Date()));

    const addTodoItem = () => {
        if (inputText && inputText !== '') {
            const newTodoItem = {id: uuidv4(), text: inputText, isCompleted: false};

            setData([...data, newTodoItem]);
            setInputText('');
        }
    }

    const deleteTodoItem = (id) => {
        const newData = data.filter(todo => todo.id !== id);
        setData(newData)
    }

    const onCheckboxChanged = (id) => {
        const newTodoList = data.map(todoItem => {
            if (todoItem.id === id) {
                return {...todoItem, isCompleted: !todoItem.isCompleted}
            } else {
                return todoItem
            }
        })

        setData(newTodoList);
    }

    const onEnterDown = (e) => {
        if (e.key === 'Enter') {
            addTodoItem()
        }
    }

    const renderTodoItems = (list) => {
        if (list && list.length > 0) {
            return list.map(itemData => {
                return <TodoItem key={itemData.id} id={itemData.id} text={itemData.text}
                                 handleChange={onCheckboxChanged} handleDelete={deleteTodoItem}
                                 isCompleted={itemData.isCompleted}/>
            })
        }
    }

    return (
        <div className="App__wrap">
            <div className="App">
                <header>
                    <h1 className="App__title">todos</h1>
                </header>
                <div className="todo">
                    <div className="todo__form">
                        <input placeholder={`Type your ${weekDay} business...`} type="text"
                               value={inputText} className="todo__input"
                               onChange={e => setInputText(e.target.value)}
                               onKeyDown={onEnterDown}/>
                        <button className="todo__btn" onClick={addTodoItem}>+</button>
                    </div>
                    <ul className="todo__list">
                        {renderTodoItems(data)}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;
