import React, { useState } from 'react';
// import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { postCollection } from '../store/collection';


export default function MakeCollectionForm() {
    const [errors, setErrors] = useState([])
    const [collectionName, setCollectionName] = useState("")
    const dispatch = useDispatch();

    const formSubmitFunc = async (e) => {
        e.preventDefault();
        const errorData = await dispatch(postCollection(collectionName))
        if (errorData) setErrors(errorData)
        setCollectionName("")
    }

    const updateCollectionName = e => setCollectionName(e.target.value)


    return (

        <form onSubmit={formSubmitFunc}>
            <div>
                {errors.map((err, ind) => (
                    <div key={ind}>{err}</div>
                ))}
            </div>
            <div>
                <label>Create a collection </label>
                <input
                    type='text'
                    name='name'
                    placeholder='Your Collection Name'
                    onChange={updateCollectionName}
                    value={collectionName}></input>
            </div>
                <button type='submit'>Submit</button>
        </form>
    )
}
