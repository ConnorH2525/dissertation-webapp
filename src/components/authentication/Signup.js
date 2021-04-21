import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"
import "firebase/firestore"
import Navbar from "../layout/Navbar"

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [username, setName] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleChange(e) {
        setName(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !==
            passwordConfirmRef.current.value) {
                return setError("Passwords do not match")
            }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value, username)
            history.push("/")
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    return (
        <>
        <Navbar />
        <div style={{backgroundColor:"#F6D7AF"}}>
        <CenteredContainer>
            <Card style={{backgroundColor:"#F6D7AF"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Create Account</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type="text"
                                name="username"
                                id="username"
                                required
                                value={username}
                                onChange={handleChange}
                        />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit" style={{backgroundColor:"#FF6B09", borderColor:"#FF6B09"}}>
                            Create Account
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link style={{color: "#FF6B09"}} to="/login">Log In</Link>
            </div>
        </CenteredContainer>
        </div>
        </>
    )
}

export default Signup
