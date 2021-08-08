import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { PostCollection, ShowErrorBox, RemoveErrorBox } from '../store/collection';
import './CollectionForm.css'


export default function CollectionForm() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([])
    const [collectionName, setCollectionName] = useState("")

    const showErrors = useSelector(state => state.collections.showErrors)


    const formSubmitFunc = async (e) => {
        e.preventDefault();
        const data = await dispatch(PostCollection(collectionName))
        if (data) {
            setErrors(data)
            dispatch(ShowErrorBox());
        }
        else {
            dispatch(RemoveErrorBox())
            setCollectionName("")
        }
    }


    return (
        <div id="collection-form__container">


            <div id="collection-form__label">Create a collection </div>


            <form onSubmit={formSubmitFunc} >
                <div id="collection-form__flex">
                    <input
                        type='text'
                        name='Collection Name'
                        autoFocus
                        autoComplete='off'
                        placeholder='Name (40 character limit)'
                        onChange={({ target: { value } }) => setCollectionName(value)}
                        value={collectionName} />
                    <button type='submit'>Submit</button>
                </div>
            </form>

            {showErrors
                ? (<div id="collection-form__errors"
                    style={{ color: 'red' }}>
                    {errors.map((err, ind) => (
                        <div key={ind}>{err}</div>
                    ))}
                </div>)
                : null
            }

        </div>
    )
}
