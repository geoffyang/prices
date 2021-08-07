import { useState } from 'react';
import { useDispatch } from "react-redux";

import { PostCollection } from '../store/collection';
import './CollectionForm.css'


export default function CollectionForm() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([])
    const [collectionName, setCollectionName] = useState("")

    const formSubmitFunc = async (e) => {
        e.preventDefault();
        const data = await dispatch(PostCollection(collectionName))
        if (data) {
            setErrors(data)
        }
        setCollectionName("")
    }


    return (
        <div id="collection-form__container">
            <div id="collection-form__errors"
                style={{ color: 'red' }}>
                {errors.map((err, ind) => (
                    <div key={ind}>{err}</div>
                ))}
            </div>

            <form onSubmit={formSubmitFunc} >
                <div id="collection-form__label">Create a collection </div>
                <div id="collection-form__flex">

                    <input
                        type='text'
                        name='Collection Name'
                        autoFocus
                        autoComplete='off'
                        placeholder='Your Collection Name (40 character limit)'
                        onChange={({ target: { value } }) => setCollectionName(value)}
                        value={collectionName} />
                    <button type='submit'>Submit</button>
                </div>

            </form>
        </div>
    )
}
