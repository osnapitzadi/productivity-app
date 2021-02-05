import React, { useState, useEffect } from 'react'
import {ListGroup} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { todoDB } from '../../firebase';
import TodoItem from './TodoItem'

export default function TodoList() {

    const [todoList, setTodoList] = useState([]);
    const { currentUser } = useAuth();

    // Database change tacker
    useEffect(() => {
        const unsubscribe = todoDB.todos
        .where('userId', '==', currentUser.uid)
        .orderBy('createdAt')
        .onSnapshot(querySnapshot => {
            setTodoList(querySnapshot.docs.map(doc => ({id: doc.id, todo: doc.data()})));
        })
        return () => unsubscribe();
    }, [])
    
    //button handlers
    

    return (
        <ListGroup key={currentUser.uid}>
        {    todoList.map(todo => (
                    <TodoItem 
                        key={todo.id}
                        id={todo.id}
                        title={todo.todo.title}
                        done={todo.todo.done}
                    />
            ))
        }
        </ListGroup>

    )
}
