import { useState } from 'react';
import imageTwo from './icon.png'; 
import { FaTrash } from 'react-icons/fa';

export const ToDoList = () => {
    const [userText, setUserText] = useState('');
    const [toDoList, setToDoList] = useState([]);

    const addTask = (e) => {
        e.preventDefault();
        if (userText.trim() === '') {
            alert('Please, enter your task');
            return;
        }
        const newItem = {
            id: Date.now(),
            text: userText,
            isCrossed: false
        };
        setToDoList([...toDoList, newItem]);
        setUserText('');
    };

    const toggleCrossed = (id) => {
        setToDoList(toDoList.map(item => 
            item.id === id ? { ...item, isCrossed: !item.isCrossed } : item
        ));
    };

    const deleteItem = (id) => {
        setToDoList(toDoList.filter(item => item.id !== id));
    };

    return (
        <div className="App">
            <h1>Your To Do List App</h1>
            <form onSubmit={addTask}>
                <div className='Container'>
                    <input 
                        type="text" 
                        placeholder="Add new task"
                        onChange={(e) => setUserText(e.target.value)} 
                        value={userText}
                    />
                    <button type="submit" className='Btn Add'>Add task</button>
                </div>
                <ul>
                    {toDoList.map((item) => (
                        <li key={item.id} className={item.isCrossed ? 'crossed' : ''}>
                            <span onClick={() => toggleCrossed(item.id)}>
                                <img src={imageTwo} width='20px' alt='check'/> 
                                {item.text}
                            </span>
                            <button 
                                type="button"
                                onClick={() => deleteItem(item.id)} 
                                className='Btn DeleteItem'
                            >
                                <FaTrash size={12} />
                            </button>
                        </li>  
                    ))}
                </ul>
                {toDoList.length > 0 && (
                    <div className='Container'>
                        <button 
                            type="button"
                            onClick={() => setToDoList([])} 
                            className='Btn Delete'
                        >
                            Delete all tasks
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};