import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"
import firebase from "../../firebase"
import "firebase/firestore"
import Navbar from "../layout/Navbar"

const UpdateProfile = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [username, setName] = useState("")

    function updateUsername(username) {
        const db = firebase.firestore()
        db.collection("users")
        .doc(currentUser.uid)
        .set({
            userId: currentUser.uid,
            username: username
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !==
            passwordConfirmRef.current.value) {
                return setError("Passwords do not match")
            }

        const promises = []
        setLoading(true)
        setError("")
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }
        if (username) {
            promises.push(updateUsername(username))
        }

        Promise.all(promises).then(() => {
            history.push("/user")
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false)
        })
    }

    /*async function handleDelete() {
        setError("")

        try {
            await deleteAccount()
            history.pushState("/login")
        } catch {
            setError("Failed to delete account")
        }
    }*/

    return (
        <>
        <Navbar />
        <div style={{backgroundColor:"#F6D7AF"}}>
        <CenteredContainer>
            <Card style={{backgroundColor:"#F6D7AF"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Change your name here"
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same"/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit" style={{backgroundColor:"#FF6B09", borderColor:"#FF6B09"}}>
                            Update
                        </Button>
                        {/*<Button onClick={handleDelete} className="w-100" variant="link" style={{backgroundColor:"red", borderColor:"#FF6B09", marginTop:"10px"}}>
                            Delete Account
                        </Button>*/}
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link style={{color: "#FF6B09"}} to="/user">Back</Link>
            </div>
        </CenteredContainer>
        </div>
        </>
    )
}

export default UpdateProfile
