import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal, Form } from "react-bootstrap"
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import firebase, { database } from "../../firebase"
import "firebase/firestore"

const AddTextButton = ({ currentGroup }) => {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState("")
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

    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    function handleUpload(e) {
        e.preventDefault()

        if (currentGroup == null) return

        database.files.add({
            isText: true,
            text: text,
            createdAt: database.getCurrentTimestamp(),
            groupId: currentGroup.id,
            username: username.username
        })

        setText("")
        closeModal()
    }

    return (
        <>
            <div style={{marginTop:"10px"}}></div>
            <Button onClick={openModal} style={{backgroundColor:"rgba(0, 0, 0, 0)", minWidth:"150px", paddingTop:"10px", color:"#FF6B09", borderColor: "#FF6B09"}}>
                <FontAwesomeIcon icon={faCommentAlt} size="3x" style={{color:"#212121"}}/>
                <p>Upload Message</p>
                {/*<FontAwesomeIcon icon={faUsers} style={{color: "#FF6B09"}}/>*/}  
            </Button>
            {/*<label className="btn btn-sm m-0 mr-2 pt-3" style={{backgroundColor:"rgba(0, 0, 0, 0)", minWidth:"150px", color:"#FF6B09", borderColor: "#FF6B09"}}>
                <FontAwesomeIcon icon={faEnvelopeOpenText} size="3x" style={{color:"#212121"}}/>
                <p>Upload Text</p>
    </label>*/}
            <Modal show={open} onHide={closeModal}>
            <Form onSubmit={handleUpload}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Enter Message</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={text}
                            onChange={e => setText(e.target.value)}
                            />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal} style={{backgroundColor:"#212121", borderColor:"#212121"}}>
                        Close
                    </Button>
                    <Button variant="success" type="submit" style={{backgroundColor:"#FF6B09", borderColor:"#FF6B09"}}>
                        Upload Message
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}

export default AddTextButton
