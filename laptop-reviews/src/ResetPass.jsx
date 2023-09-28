import "./LoginPage.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import {app} from "./firebase.config"
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth(app)

function ResetPage() {
    const navigate = useNavigate()
    const [mail, setMail] = useState("")
    const [mailSent, setMailSent] = useState(false)
    const [error, setError] = useState(null)

    const handleResetLink = () => {
        sendPasswordResetEmail(auth, mail)
            .then(() => {
                console.log("Email sent sucessfully")
                setMailSent(true)
            })
            .catch((error) => {
                setError(error)
            })
    }

    return (
        <div className="login-body">
            <div className="loginPage">
                {error && <div className="error-msg">{error.message}</div>}
                <div className="pagename">
                    RESET
                </div>
                <div className="login-box">
                    <input type="text" id="mail-box" placeholder="E-mail" value={mail} onChange={(event) => (setMail(event.target.value))} />
                    <input type="submit" value="Send reset link" id="signin-btn" onClick={handleResetLink} />
                </div>
            </div>
        </div>
    )
}

export default ResetPage