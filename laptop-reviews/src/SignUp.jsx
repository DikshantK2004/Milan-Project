import { useState } from "react"
import "./SignUp.css"
import { app } from "./firebase.config"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"

const auth = getAuth(app)

function SignUp() {
    const navigate = useNavigate()
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordTwo, setPasswordTwo] = useState("")
    const [error, setError] = useState(null)

    const signUp = () => {
        if (password === passwordTwo) {
            createUserWithEmailAndPassword(auth, mail, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    console.log("Registered Successfully")
                    navigate("/")
                })
                .catch((error) => {
                    setError(error)
                    console.log(error)
                })
        }
    }
    return (
        <div className="signup-body">
            <div className="signupPage">
                {error && <div className="error-msg">{error.message}</div>}
                <div className="pagename">
                    SIGN UP
                </div>
                <div className="signup-box">
                    <input type="text" id="mail-box" placeholder="E-mail" value={mail} onChange={(event) => (setMail(event.target.value))} />
                    <input type="password" id="password-box" placeholder="Choose password" value={password} onChange={(event) => (setPassword(event.target.value))} />
                    <input type="password" id="password-box" placeholder="Confirm password" value={passwordTwo} onChange={(event) => (setPasswordTwo(event.target.value))} />
                    <input type="submit" value="Create account" id="signin-btn" onClick={signUp} />
                    <div className="new-acnt-text">
                        Already registered?
                        <span onClick={() => { navigate("/login") }} id="new-link">  Log in</span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SignUp