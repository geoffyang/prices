import { useState } from 'react';
import { useDispatch } from "react-redux";

import { PostCollection } from '../store/collection';
import './CollectionForm.css'


export default function CollectionForm() {
    const dispatch = useDispatch();
    // const [errors, setErrors] = useState([])
    const [collectionName, setCollectionName] = useState("")

    const formSubmitFunc = async (e) => {
        e.preventDefault();
        await dispatch(PostCollection(collectionName))
        setCollectionName("")
    }

    // const updateCollectionName = e => setCollectionName(e.target.value)

    return (

        <form onSubmit={formSubmitFunc} id="collection-form__container">
            {/* <div>
                {errors.map((err, ind) => (
                    <div key={ind}>{err}</div>
                ))}
            </div> */}

            <div id="collection-form__label">Create a collection </div>
            <div id="collection-form__flex">

                <input
                    type='text'
                    name='name'
                    autoFocus
                    autoComplete='off'
                    placeholder='Your Collection Name'
                    onChange={({ target: { value } }) => setCollectionName(value)}
                    value={collectionName} />
                <button type='submit'>Submit</button>
            </div>

        </form>
    )
}
