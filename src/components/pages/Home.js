import React, { useState, useEffect, useRef } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Loader from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion"
import logo from '../../logo.png';




export default function Home() {


    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    const [time, setTime] = useState();

    useEffect(() => {
        var timerID = setInterval( () => tick(), 1000 );

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function tick() {
        setTime(format(new Date(), "hh:mm:ss"));
    }





    return (
        <Container>
            { loading ? 

            <Loader 
                className='d-flex justify-content-center align-items-center vh-100'
                type="ThreeDots"
                color="#86C232"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />

            :
            <>
                <Navbar variant='dark' fixed='top'>
                <Navbar.Brand>
                <img
                    alt=""
                    src={logo}
                    width="100"
                    height="30"
                    className="d-inline-block align-top"
                />
                </Navbar.Brand>
                    <Nav className="justify-content-end ml-auto">
                        <Nav.Link as={Link} to='/login'>Sign In</Nav.Link>
                        <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
                    </Nav>
                </Navbar>
                <AnimatePresence className='vh-100 wh-100'>

                    <motion.h1
                        key='h1'
                        className="h1"
                        initial={{ opacity: 1 }}
                        animate={{ 
                            opacity: 0,
                            color: "#FF0000"
                        }}
                        transition={{ duration: 5 }}
                        
                    >
                        {time}
                    </motion.h1>

                    <motion.h1
                        key='hook'
                        className="hook"
                        // initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: [0, 1, 0]
                        }}
                        transition={{ 
                            duration: 3,
                            delay: 5 
                        }}
                    >
                        Stop Wasting Your Time
                        
                    </motion.h1>

                    <motion.h1 
                        className="join"
                        key='join'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                            duration: 4,
                            delay: 7.99
                        }}
                    >
                        Join <span className="prodact">ProdAct</span>
                    </motion.h1>
                </AnimatePresence>
            </>
        }        
        </Container>
    )
}
