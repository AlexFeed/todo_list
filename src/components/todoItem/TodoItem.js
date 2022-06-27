import './todoItem.css';

const TodoItem = ({text, isCompleted, id, handleChange, handleDelete}) => {
    return(
        <li className="todoItem">
            <input checked={isCompleted} onChange={() => handleChange(id)}
                   type="checkbox" className="todoItem__checkbox"/>
            <label className="todoItem__text">{text}</label>
            <button onClick={() => handleDelete(id)} className="todoItem__delete"/>
        </li>
    )
}

export default TodoItem;