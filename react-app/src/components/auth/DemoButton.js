import { useDispatch, useSelector } from "react-redux";

import { login } from "../../store/session"

export default function DemoButton() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user);

    const loginDemoUser = async (e) => {
        await dispatch(login("demo@aa.io", "password"));
    }

    return (user === null) &&
        <button id="demo-user-button" onClick={loginDemoUser}>
            Demo User
        </button>
}
