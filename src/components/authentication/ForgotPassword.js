import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"
import Navbar from "../layout/Navbar"

const ForgotPassword = () => {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your email to reset password")
        } catch {
            setError("Failed to reset password")
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
                        <h2 className="text-center mb-4">Password Reset</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required/>
                            </Form.Group>
                            <Button disabled={loading} className="w-100" type="submit" style={{backgroundColor:"#FF6B09", borderColor:"#FF6B09"}}>
                                Reset Password
                            </Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            <Link style={{color: "#FF6B09"}} to="/login">Log In</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link style={{color: "#FF6B09"}} to="/signup">Sign Up</Link>
                </div>
            </CenteredContainer>
        </div>
        </>
    )
}

export default ForgotPassword

