import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom"
import { useAuth } from '../../contexts/AuthContext'
import firebase, { storage, database } from "../../firebase"
import { ROOT_GROUP } from "../../hooks/useGroup"
import { v4 as uuid4 } from  "uuid"
import { Toast, ProgressBar } from "react-bootstrap"
import "firebase/firestore"

const AddMediaButton = ({ currentGroup }) => {
    const [uploadingFiles, setUploadingFiles] = useState([])
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

    function handleUpload(e) {
        const file = e.target.files[0]
        if (currentGroup == null || file == null) return

        const id = uuid4(0)
        setUploadingFiles(prevUploadingFiles => [
            ...prevUploadingFiles,
            { id: id, name: file.name, progress: 0, error: false }
        ])
        const filePath = 
            currentGroup === ROOT_GROUP 
            ? `${currentGroup.path.join("/")}/${file.name}`
            : `${currentGroup.path.join("/")}/${currentGroup.name}/${file.name}`

        const uploadTask = storage
            .ref(`/files/${currentUser.uid}/${filePath}`)
            .put(file)

        uploadTask.on('state_changed', snapshot => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                    if (uploadFile.id === id) {
                        return { ...uploadFile, progress: progress }
                    }

                    return uploadFile
                })
            })
        }, () => {
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                    if (uploadFile.id === id) {
                        return { ...uploadFile, error: true }
                    }
                    return uploadFile
                })
            })
        }, () => {
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.filter(uploadFile => {
                    return uploadFile.id !== id
                })
            })

            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                database.files
                .where("name", "==", file.name)
                .where("userId", "==", currentUser.uid)
                .where("folderId", "==", currentGroup.id)
                .get()
                .then(existingFiles => {
                    const existingFile = existingFiles.docs[0]
                    if (existingFile) {
                        existingFile.ref.update({ url: url })
                    } else {
                        database.files.add({
                        isText: false,
                        url: url,
                        name: file.name,
                        createdAt: database.getCurrentTimestamp(),
                        groupId: currentGroup.id,
                        username: username.username
                    })
                    }
                })
            })
        })
    }

    return (
        <>
            <div style={{marginTop:"10px"}}></div>
            {/*<Button onClick={handleUpload} style={{backgroundColor:"rgba(0, 0, 0, 0)", minWidth:"150px", marginTop:"10px", color:"#FF6B09", borderColor: "#FF6B09"}}>
                <FontAwesomeIcon icon={faFileUpload} size="3x" style={{color:"#212121"}}/>
                <p>Upload Media</p>
                <input type="file" onChange={handleUpload} style={{ opacity: 0, position: "absolute", left: "-9999px" }} />
            </Button> */}
            <label className="btn m-0 mr-2 pt-3" style={{backgroundColor:"rgba(0, 0, 0, 0)", minWidth:"150px", color:"#FF6B09", borderColor: "#FF6B09"}}>
                <FontAwesomeIcon icon={faFileUpload} size="3x" style={{color:"#212121"}}/>
                <p>Upload Media</p>
                <input type="file" onChange={handleUpload} style={{ opacity: 0, position: "absolute", left: "-9999px" }} />
            </label>
            {uploadingFiles.length > 0 &&
             ReactDOM.createPortal(
                 <div
                 style={{
                     position: "absolute",
                     bottom: "1rem",
                     right: "1rem",
                     maxWidth: "250px"
                 }}>
                     {uploadingFiles.map(file => (
                         <Toast key={file.id} onClose={() => {
                             setUploadingFiles(prevUploadingFiles => {
                                 return prevUploadingFiles.filter(uploadFile => {
                                     return uploadFile.id !== file.id
                                 })
                             })
                         }}>
                             <Toast.Header 
                             closeButton ={file.error}
                             className="text-truncate w-100 d-block"
                             >
                                 {file.name}
                             </Toast.Header>
                             <Toast.Body>
                                 <ProgressBar 
                                    animated={!file.error}
                                    variant={file.error ? "danger" : "primary"}
                                    now={file.error ? 100 : file.progress * 100 }
                                    label={
                                        file.error ? "Error" : `${Math.round(file.progress * 100)}%`
                                    }
                                    />
                             </Toast.Body>
                         </Toast>
                     ))}
                 </div>,
                 document.body
             )}
        </>
    )
}

export default AddMediaButton
