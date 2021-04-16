import React, { useState } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"
import Header from "../pages/Header"
import { motion } from 'framer-motion';


export default function Dashboard() {

  // definig hooks
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {

    // clears error message
    setError("")

    try {
      await logout()

      // redirech to login 
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
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
        <CenteredContainer>
          <Card
          bg='dark'
          text='light'>
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email:</strong> {currentUser.email}
              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                Update Profile
              </Link>
            </Card.Body>
          <Card.Footer className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </Card.Footer>
          </Card>
        </CenteredContainer>
      </motion.div>
    </Container>
  )
}