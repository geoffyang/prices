import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PostComment } from '../store/service';

import './CommentsForm.css'


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

        <form onSubmit={formSubmitFunc} className='form'>
            {/* <div>
                {errors.map((err, ind) => (
                    <div key={ind}>{err}</div>
                ))}
            </div> */}
            < div >
                <label id="insightful-comment">Provide your insight </label>
                <input
                    type='text'
                    name='comment'
                    autoFocus
                    autoComplete="off"
                    placeholder='This service was...'
                    onChange={({ target: { value } }) => setComment(value)}
                    value={comment} />
            </div >
            <button type='submit'>Submit</button>
        </form >
    )
}
