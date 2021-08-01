import { useState } from 'react';
// import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { postCollection } from '../store/collection';


export default function MakeCollectionForm() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([])
    const [collectionName, setCollectionName] = useState("")

    const formSubmitFunc = async (e) => {
        e.preventDefault();
        await dispatch(postCollection(collectionName))
        setCollectionName("")
    }

    const updateCollectionName = e => setCollectionName(e.target.value)


    return (

        <form onSubmit={formSubmitFunc} style={{width:"100%"}}>
            {/* <div>
                {errors.map((err, ind) => (
                    <div key={ind}>{err}</div>
                ))}
            </div> */}
            <div>
                <label>Create a collection </label>
                <input
                    type='text'
                    name='name'
                    autoFocus
                    placeholder='Your Collection Name'
                    onChange={updateCollectionName}
                    value={collectionName}></input>
            </div>
                <button type='submit'>Submit</button>
        </form>
    )
}
