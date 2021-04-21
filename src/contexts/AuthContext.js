import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import firebase from "../firebase"
import "firebase/firestore"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    async function signup(email, password, username) {
        try {
            await auth.createUserWithEmailAndPassword(email, password)
            
            const currentUser = firebase.auth().currentUser
            const db = firebase.firestore()

            db.collection("users")
            .doc(currentUser.uid)
            .set({
                userId: currentUser.uid,
                username: username
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    //function deleteAccount() {
        //return currentUser.delete()
    //}

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        //deleteAccount
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
