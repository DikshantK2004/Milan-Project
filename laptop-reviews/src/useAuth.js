import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase.config"

function useAuth(){
    const [user, setUser] = useState(null)
    const auth = getAuth(app)

    useEffect(() => {
        const signOut = onAuthStateChanged(auth, (user) => {
            setUser(user)
        })

        return() => signOut()
    }, [])

    return user

}

export default useAuth;