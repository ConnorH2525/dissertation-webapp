import React from 'react'
import { Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import SignedInLinks from "./SignedInLinks"
import SignedOutLinks from "./SignedOutLinks"

const TopNavbar = () => {
    const { currentUser } = useAuth()
    const links = currentUser ? <SignedInLinks /> : <SignedOutLinks />

    return (
        <Navbar style={{backgroundColor:"#212121", justifyContent: "center"}}>
            <Navbar.Brand id="title" as={Link} style={{fontWeight:"bold", color:"white"}} to ="/">
                FellowFrame
            </Navbar.Brand>
            {links}
        </Navbar>
    )
}

export default TopNavbar
