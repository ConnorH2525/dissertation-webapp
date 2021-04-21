import React, { useState } from 'react'
import { Button, Modal, Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import firebase from "../../firebase"
import { useAuth } from "../../contexts/AuthContext"
import "firebase/firestore"

const JoinGroupButton = () => {
    const [open, setOpen] = useState(false)
    const [code, setCode] = useState("")
    //const [members, setMembers] = useState([""])
    var members = []
    const { currentUser } = useAuth()

    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    async function addMembersToGroup() {
        const db = firebase.firestore()

        try {
            await db.collection("groups")
            .doc(code)
            .get()
            .then((doc) => {
                console.log(doc.data().members)
                members = [...doc.data().members]
                if (members.some(currentUser => (currentUser.uid !== members))) {
                    members.push(currentUser.uid)
                    console.log(members)
                    db.collection("groups")
                    .doc(code)
                    .update({
                        members: members
                    })
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        addMembersToGroup()

        console.log(members)

        // database.groups.ref("members")
        //     .doc("members")
        //     .where("id", "==", code)
        //     .add({
        //         userId: currentUser.uid,
        // })

        setCode("")
        closeModal()
    }

    return (
        <>
        <Button onClick={openModal} style={{backgroundColor:"rgba(0, 0, 0, 0)", minWidth:"150px", marginTop:"10px", marginLeft:"10px", color:"#FF6B09", borderColor: "#FF6B09"}}>
            <FontAwesomeIcon icon={faPlus} size="3x" style={{color:"#212121"}}/>
            <p>Join Group</p>
            {/*<FontAwesomeIcon icon={faUsers} style={{color: "#FF6B09"}}/>*/}
        </Button>
        <Modal show={open} onHide={closeModal}>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Frame Code</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal} style={{backgroundColor:"#212121", borderColor:"#212121"}}>
                        Close
                    </Button>
                    <Button variant="success" type="submit" style={{backgroundColor:"#FF6B09", borderColor:"#FF6B09"}}>
                        Connect
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}

export default JoinGroupButton
