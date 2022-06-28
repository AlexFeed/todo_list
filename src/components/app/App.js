import {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {useLocalStorage} from "@rehooks/local-storage";

import TodoItem from "../todoItem/TodoItem";

import './App.css';


function App() {
    const [data, setData] = useLocalStorage('data', [])

    const [todosFilter, setTodosFilter] = useState('all')

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

    const changeTodoItemText = (id, editedText) => {
        const newTodoList = data.map(todoItem => {
            if (todoItem.id === id) {
                return {...todoItem, text: editedText}
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
                                 onCheckboxChanged={onCheckboxChanged} handleDelete={deleteTodoItem}
                                 isCompleted={itemData.isCompleted}
                                 changeTodoItemGlobalText={changeTodoItemText}/>
            })
        }
    }

    const renderFilteredTodos = (filter, list = data) => {
        if (list && list.length > 0) {
            switch (filter) {
                case 'all':
                    return data
                case 'completed':
                    return list.filter(todo => todo.isCompleted === true)
                case 'uncompleted':
                    return list.filter(todo => todo.isCompleted === false)
                default:
                    return
            }
        }
    }

    const filteredTodos = renderFilteredTodos(todosFilter);

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
                        {renderTodoItems(filteredTodos)}
                    </ul>
                </div>
                <footer className="footer">
                    <div className="footer__filters">
                        <button onClick={() => setTodosFilter('all')}
                                className={`filter__item ${todosFilter === 'all' ? 'activeFilter' : ''}`}>
                            All
                        </button>
                        <button onClick={() => setTodosFilter('uncompleted')}
                                className={`filter__item ${todosFilter === 'uncompleted' ? 'activeFilter' : ''}`}>
                            Uncompleted
                        </button>
                        <button onClick={() => setTodosFilter('completed')}
                                className={`filter__item ${todosFilter === 'completed' ? 'activeFilter' : ''}`}>
                            Completed
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;
