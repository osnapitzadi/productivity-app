import React, { useState, useEffect, useRef } from 'react'
import { Container, Card, Button, Tabs, Tab, InputGroup, FormControl } from 'react-bootstrap'
import { FaPlay, FaStop } from 'react-icons/fa';
import Header from '../pages/Header';
import { trackDB } from '../../firebase'
import { useAuth } from "../../contexts/AuthContext"
import { motion } from "framer-motion"
import TrackList from "./TrackList";



export default function Track() {

    const [timer, setTimer] = useState(0);
    const countRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const { currentUser } = useAuth();



    const handleStart = () => {
        if (isActive) {
            return
        } else {
            setIsActive(true);
            let st = new Date();
            setStartTime(st.valueOf())
            console.log(startTime);
            countRef.current = setInterval(() => {
                setTimer((timer) => timer + 1)
            }, 1000)
        }
    }
    
    const handleStop = () => {
        setIsActive(false)
        setEndTime(new Date().getTime())

        // trackDB.track.add({
        //     category: category,
        //     title: "todoInput",
        //     startTime: startTime,
        //     endTime: endTime,
        //     userId: currentUser.uid,
        // })
        // .then((docRef) => {
        //     console.log('Track was added with id '+docRef.id);
        // });

        clearInterval(countRef.current)
        setTimer(0)
    }

    useEffect(() => {
        if (endTime === 0) {
            return
        } else {
            trackDB.track.add({
                category: category,
                createdAt: trackDB.getCurrentTimestamp(),
                title: trackInput,
                startTime: startTime,
                endTime: endTime,
                userId: currentUser.uid,
            })
            .then((docRef) => {
                console.log('Track was added with id '+docRef.id);
            });
            setTrackInput('')
        }
    }, [endTime])
    
    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
    
        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }

    const [category, setCategory] = useState("prod");

    const categoryVariants = {
        prod: { background: '#c3e6cb', color: '#155724'},
        nv: { background: '#f5c6cb', color: '#721c24' },
        sleep : { background: '#b8daff', color: '#004085' },
        relationships: { background: '#bee5eb', color: '#0c5460' }
    }

    const [trackInput, setTrackInput] = useState('');

    const inputHandler = (e) => {
        setTrackInput(e.target.value);
    }


    return (
        <Container>
            
            
            <Header />
            <motion.div
                variants={categoryVariants}
                initial='prod'
                animate={category}
                transition={{ ease: "easeOut", duration: 1 }}
            > 
            <Card className="text-center"
                bg='transparent'
                // text='light'
            >
                <Card.Header>
                    <Tabs 
                        id="category-tabs"
                        variant="pills"
                        activeKey={category}
                        onSelect={(c) => setCategory(c)}
                        justify="true"
                        as="btn"
                    >
                        <Tab eventKey="prod" title="Productivity" variant='light'>
                        </Tab>
                        <Tab eventKey="nv" title="No Value">
                        </Tab>
                        <Tab eventKey="sleep" title="Sleep" >
                        </Tab>
                        <Tab eventKey="relationships" title="Relationships" >
                        </Tab>
                    </Tabs>
                </Card.Header>
                <Card.Body>
                    {/* INPUT */}
                    <InputGroup size="lg">
                        <FormControl 
                            aria-label="Large" 
                            aria-describedby="inputGroup-sizing-sm" 
                            placeholder="What are you up to?"
                            onInput={inputHandler} 
                            value={trackInput}
                        />
                    </InputGroup>
                </Card.Body>
                <Card.Body>
                    <h1> {formatTime()} </h1> 
                </Card.Body>
                <Card.Footer className='d-flex justify-content-around'>
                    <Button 
                        onClick={handleStart}
                        variant="outline-dark"
                        className="d-flex justify-content-center align-items-center p-2"
                    >
                        <FaPlay />
                    </Button>
                    <Button 
                        onClick={handleStop}
                        variant="outline-dark" 
                        className="d-flex justify-content-center align-items-center p-2"
                    >
                        <FaStop />
                    </Button>  
                </Card.Footer>
            </Card>
            </motion.div>
            <h1 className="m-3 text-center">Your Tracked List</h1>
            <TrackList />
        </Container>
    )
}
