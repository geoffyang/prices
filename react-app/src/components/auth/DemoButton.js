import { useDispatch } from "react-redux";

import { login } from "../../store/session"
import './DemoButton.css'

export default function DemoButton() {
    const dispatch = useDispatch()

    const loginDemoUser = async (e) => {
        await dispatch(login("demo@aa.io", "password"));
    }

    return (
        <button id="demo-user-button" onClick={loginDemoUser} >
            Demo User
        </button>)
}
