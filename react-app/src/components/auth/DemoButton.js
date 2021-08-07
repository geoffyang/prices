import { useDispatch } from "react-redux";

import { login } from "../../store/session"

export default function DemoButton() {
    const dispatch = useDispatch()

    const loginDemoUser = async (e) => {
        await dispatch(login("demo@aa.io", "password"));
    }

    return (
        <button id="demo-user-button" onClick={loginDemoUser} style={{ backgroundColor: "blueviolet", color: "white" }}>
            Demo User
        </button>)
}
