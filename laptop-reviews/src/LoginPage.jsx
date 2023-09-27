import "./LoginPage.css"
import googleIcon from "./assets/flat-google-icon.svg"
import { app } from "./firebase.config";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    signInWithEmailAndPassword
} from "firebase/auth"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

function LoginPage() {
    const navigate = useNavigate()
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const user = useAuth()

    //Sign in with email and password
    const signIn = () => {
        signInWithEmailAndPassword(auth, mail, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log("Signned in successfully", user)
            })
            .catch((error) => {
                setError(error)
                console.log(error)
            })
    }

    //Sign in with Google
    function handleLogin(event) {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const credentials = GoogleAuthProvider.credentialFromResult(result)
                const token = credentials.accessToken
                const user = result.user
                console.log(result.user.metadata.lastSignInTime)
                console.log("Signed in successfully")
                navigate("/")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="login-body">
            <div className="loginPage">
                {error && <div className="error-msg">{error.message}</div>}
                <div className="pagename">
                    SIGN IN
                </div>
                <div className="login-box">
                    <input type="text" id="mail-box" placeholder="E-mail" value={mail} onChange={(event) => (setMail(event.target.value))} />
                    <input type="password" id="password-box" placeholder="Password" value={password} onChange={(event) => (setPassword(event.target.value))} />
                    <div className="forgot-pass-link">
                        <span onClick={() => { navigate("/reset") }} id="new-link">  Forgot password?</span>
                    </div>
                    <input type="submit" value="Sign in" id="signin-btn" onClick={signIn} />
                    <div className="new-acnt-text">
                        New here?
                        <span onClick={() => { navigate("/signup") }} id="new-link">  Create an account</span>
                    </div>
                </div>
                <div className="google-signin-btn" onClick={handleLogin}>
                    <img src={googleIcon} id="google-icon" />
                    Sign in with Google
                </div>
            </div>
        </div>
    )
}

export default LoginPage