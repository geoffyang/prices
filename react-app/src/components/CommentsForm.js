import { useState } from 'react';
import { useDispatch , useSelector} from "react-redux";
import { PostComment } from '../store/service';


export default function CommentsForm() {
    const dispatch = useDispatch();
    // const [errors, setErrors] = useState([])
    const [comment, setComment] = useState("")
    const serviceId = useSelector(state => state.service.currentServiceObj.id)

    const formSubmitFunc = async (e) => {
        e.preventDefault();
        await dispatch(PostComment(comment, serviceId))
        setComment("")
    }


    return (

        <form onSubmit={formSubmitFunc} style={{ width: "100%" }}>
            {/* <div>
                {errors.map((err, ind) => (
                    <div key={ind}>{err}</div>
                ))}
            </div> */}
            <div>
                <label>Your comment </label>
                <input
                    type='text'
                    name='name'
                    autoFocus
                    placeholder='This service was...'
                    onChange={({ target: { value } }) => setComment(value)}
                    value={comment}/>
            </div>
            <button type='submit'>Submit</button>
        </form>
    )
}
