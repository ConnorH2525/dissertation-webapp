import React, { useState, useEffect }from 'react'
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import firebase, { database } from "../../firebase"
import "firebase/firestore"

const SignedInLinks = () => {

    const { currentUser } = useAuth()
    const [username,setName] = useState("")

    useEffect(() => {
        firebase.firestore().collection("users")
        .doc(currentUser.uid)
        .get()
        .then(doc => {
            setName(database.formatDoc(doc))
        })
    }, [currentUser.uid])

    return (
        <Nav className="ml-auto">
            <Nav.Link style={{color:"lightgrey"}} as={Link} to ="/user">
                Hi {username.username}
            </Nav.Link>
        </Nav>
    )
}

export default SignedInLinks