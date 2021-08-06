import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PostComment } from '../store/service';

import './CommentsForm.css'


export default function CommentsForm() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([])
    const [comment, setComment] = useState("")
    const serviceId = useSelector(state => state.service.currentServiceObj.id)

    const formSubmitFunc = async (e) => {
        e.preventDefault();
        const data = await dispatch(PostComment(comment, serviceId))
        if (data) {
            setErrors(data)
        }
        setComment("")
    }


    return (

        <form onSubmit={formSubmitFunc} className='form'>
            <div id="comment-form-errors" style={{ color: 'red' }}>
                {errors.map((err, ind) => (
                    <div key={ind}>{err}</div>
                ))}
            </div>
            < div >
                <label id="insightful-comment">Provide your insight </label>
                <input
                    type='text'
                    name='comment'
                    autoFocus
                    autoComplete="off"
                    placeholder='250 character limit...'
                    onChange={({ target: { value } }) => setComment(value)}
                    value={comment} />
            </div >
            <button type='submit'>Submit</button>
        </form >
    )
}
