import './todoItem.css';

const todoItem = ({text, isCompleted, id, handleChange}) => {
    return(
        <li className="todoItem">
            <input checked={isCompleted} onChange={() => handleChange(id)} type="checkbox" className="todoItem__checkbox"/>
            <span className="todoItem__text">{text}</span>
        </li>
    )
}

export default todoItem;