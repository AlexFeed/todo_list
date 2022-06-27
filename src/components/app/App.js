import {useState} from "react";
import {v4 as uuidv4} from 'uuid';

import TodoItem from "../todoItem/TodoItem";

import './App.css';


function App() {
    const [data, setData] = useState([]);

    const [todoText, setTodoText] = useState('');

    const getWeekDay = (date) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return days[date.getDay()]
    }

    const [weekDay, setWeekDay] = useState(getWeekDay(new Date()));

    const addTodoItem = () => {
        if (todoText && todoText !== '') {
            const newTodoItem = {id: uuidv4(), text: todoText, isCompleted: false};

            setData([...data, newTodoItem]);
            setTodoText('');
        }
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

    const renderTodoItems = (list) => {
        if (list && list.length > 0) {
            return list.map(itemData => {
                return <TodoItem key={itemData.id} id={itemData.id} text={itemData.text}
                                 handleChange={onCheckboxChanged}
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
                        <input placeholder={`Type your ${weekDay} business...`} type="text" value={todoText}
                               className="todo__input" onChange={e => setTodoText(e.target.value)}/>
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
