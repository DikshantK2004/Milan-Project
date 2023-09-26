import "./LoginPage.css"
import googleIcon from "./assets/flat-google-icon.svg"
import { app } from "./firebase.config";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "firebase/auth"
import{useState, useEffect} from "react"

const provider = new GoogleAuthProvider();
const auth = getAuth();

function LoginPage(){
    function handleLogin(event){
        signInWithPopup(auth, provider)
            .then(async(result) => {
                const credentials = GoogleAuthProvider.credentialFromResult(result)
                const token = credentials.accessToken
                const user = result.user
                console.log(result.user.metadata.lastSignInTime)
                console.log("Signed in successfully")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="loginPage">
            <div className="google-signin-btn" onClick={handleLogin}>
                <img src={googleIcon} id="google-icon"/>
                Sign in with Google
            </div>
        </div>
    )
}

export default LoginPage