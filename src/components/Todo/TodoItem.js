import React from 'react'
import {ListGroup} from 'react-bootstrap';
import { FaCheckSquare, FaTrash } from 'react-icons/fa';
import { todoDB } from '../../firebase'




export default function TodoItem(props) {
    return (
        <ListGroup.Item
            className='d-flex justify-content-around align-items-center' 
            variant={props.done ? 'success' : 'danger'}
        >
            <p className="flex-grow-1 m-0">
                {props.title}
            </p>
            <span>
                <FaCheckSquare  
                    onClick={event => todoDB.todos.doc(props.id).update({
                        done: !props.done
                    })} 
                    className='mx-3'
                />
            </span>
            <span>
                <FaTrash 
                    onClick={event => todoDB.todos.doc(props.id).delete()} 
                    className='mx-3'
                />
            </span>
        </ListGroup.Item>
    )
}
