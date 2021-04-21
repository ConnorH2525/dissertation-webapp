import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

const firestore = app.firestore()
export const database = {
    //profilePic: firestore.collection("profilePics"),
    groups: firestore.collection("groups"),
    files: firestore.collection("files"),
    formatDoc: doc => {
        return { id: doc.id, ...doc.data()}
    },
    getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
}

/*export const generateUserDocument = async (user) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`)
    const snapshot = await userRef.get()
    if (!snapshot.exists) {
        const { username, photoURL } = user
        try {
            await userRef.set({
                username,
                photoURL
            })
        } catch (error) {
            console.error("Error creating user document", error)
        }
    }
}*/
export const storage = app.storage()
export const auth = app.auth()
export default app