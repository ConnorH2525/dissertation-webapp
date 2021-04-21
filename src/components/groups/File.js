import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const File = ({ file }) => {
    return (
        <a href={file.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark text-truncate w-100" style={{marginLeft:"-7px", minWidth:"150px", maxWidth:"150px"}}>
            <FontAwesomeIcon icon={faFile} className="mr-2" />
            {file.name}
        </a>      
    )
}

export default File
