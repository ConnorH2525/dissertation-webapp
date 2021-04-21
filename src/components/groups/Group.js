import React from 'react'
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers } from "@fortawesome/free-solid-svg-icons"

const Group = ({ group }) => {
    return (
        <Button to={{
            pathname: `/group/${group.id}`,
            state: { group: group }
        }}
            className="text-truncate w-100" size="lg" style={{backgroundColor:"rgba(0, 0, 0, 0)", marginLeft:"-7px", minWidth:"150px", maxWidth:"150px", borderColor:"#FF6B09"}} as={Link}>
            <FontAwesomeIcon icon={faUsers} className="mr-2" size="3x" style={{color:"#212121"}}/>
            <p style={{color:"#FF6B09"}}>{group.name}</p>
    </Button>
    )
}

export default Group

