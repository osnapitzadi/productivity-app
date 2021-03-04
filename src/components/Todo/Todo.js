import { motion } from 'framer-motion';
import React, { useState } from 'react'
import { Button, Container, InputGroup, FormControl} from 'react-bootstrap';
import { useAuth } from "../../contexts/AuthContext"
import { todoDB } from '../../firebase'
import Header from '../pages/Header';
import TodoList from './TodoList';


export default function Todo() {
    const [todoInput, setTodoInput] = useState('');
    const { currentUser } = useAuth();

    const addTodo = (e) => {
        e.preventDefault()
        if (todoInput === '') return

        todoDB.todos.add({
            title: todoInput,
            createdAt: todoDB.getCurrentTimestamp(),
            notes: "",
            userId: currentUser.uid,
            done: false
        })
        .then((docRef) => {
            console.log('Todo was added with id '+docRef.id);
        });

        setTodoInput('');
    }

    const inputHandler = (e) => {
        setTodoInput(e.target.value);
    }

    const pageVariants = {
        initial: {
          opacity: 0,
        },
        in: {
          opacity: 1,
        },
        out: {
          opacity: 0,
        },
      }
    return (
        <Container>
            <Header />
            <motion.div
                initial="initial"
                duration='2'
                animate="in"
                exit="out"
                variants={pageVariants}
            >
                <h2 className='text-center m-3'>Todo app</h2>
                <div className='d-flex-row justify-content-center'>
                    <InputGroup className="mb-3">
                        <FormControl
                            onInput={inputHandler} 
                            value={todoInput}
                            placeholder="What are you going to do next"
                            aria-label="What are you going to do next"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button 
                                variant="outline-secondary"
                                onClick={addTodo}
                            >
                                Add
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {/* <input className='flex-grow' onInput={inputHandler} value={todoInput} />
                    <Button className='m-1' onClick={addTodo}>Add</Button> */}
                </div>
                <TodoList />
            </motion.div>
        </Container>
    )
}
