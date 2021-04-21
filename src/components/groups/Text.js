import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Text = ({ file }) => {
    return (
        <p className="btn btn-outline-dark text-truncate w-100" style={{marginLeft:"-7px", minWidth:"150px", maxWidth:"150px"}}>
            <FontAwesomeIcon icon={faCommentAlt} className="mr-2" />
            {file.text}
        </p>      
    )
}

export default Text