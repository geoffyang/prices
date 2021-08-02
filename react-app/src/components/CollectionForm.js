import { useState } from 'react';
import { useDispatch } from "react-redux";
import { PostCollection } from '../store/collection';


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

        <form onSubmit={formSubmitFunc} style={{ width: "100%" }}>
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
                    onChange={({ target: { value } }) => setCollectionName(value)}
                    value={collectionName}/>
            </div>
            <button type='submit'>Submit</button>
        </form>
    )
}
