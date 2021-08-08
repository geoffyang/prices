import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BsTrash, BsPencil } from 'react-icons/bs';

import { GetCollections, GetServices, UnloadCollections, DeleteCollection, EditCollectionName } from "../store/collection"
import { Modal } from '../context/Modal'
import './CollectionsList.css'
import { ShowEditErrorBox, RemoveEditErrorBox } from "../store/collection";


export default function CollectionsList() {
    const dispatch = useDispatch();


    const [showModal, setShowModal] = useState(false);
    const [collectionId, setCollectionId] = useState("");
    const [collectionName, setCollectionName] = useState("")
    const [errors, setErrors] = useState([])

    const allCollections = useSelector(state => state.collections.all)
    const showEditErrors = useSelector(state => state.collections.showEditErrors)


    useEffect(() => {
        dispatch(GetCollections());
        return () => dispatch(UnloadCollections());
    }, [dispatch]);

    ///////// click handlers //////////
    const loadCollection = (id) => {
        dispatch(GetServices(id))
    }

    const handleEdit = async e => {
        e.preventDefault();
        const data = await dispatch(EditCollectionName({
            name: collectionName,
            id: collectionId
        }))
        if (data) {
            setErrors(data);
            dispatch(ShowEditErrorBox())
        } else {
            dispatch(RemoveEditErrorBox())
            setCollectionName("")
            setErrors([])
            setCollectionId(null)
            setShowModal(false)
        }
    }


    return (
        <>
            {Object.values(allCollections).map((c, i) => (
                <div className={"list__collection"}
                    key={i}
                    onClick={() => { loadCollection(c.id) }}
                >
                    <div className="list__collection-name">
                        {c.name}
                    </div>
                    <div className="list__collection-icons">
                        <BsPencil onClick={(e) => {
                            e.stopPropagation()
                            setShowModal(true)
                            setCollectionId(c.id)
                            setCollectionName(allCollections[c.id].name)
                        }} />
                        <BsTrash onClick={(e) => {
                            e.stopPropagation()
                            dispatch(DeleteCollection(c.id))
                        }} />
                    </div>
                </div>
            ))}

            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false)
                    setErrors([])
                    dispatch(RemoveEditErrorBox())
                }
                }>
                    <form onSubmit={handleEdit}>
                        <input
                            type='text'
                            name='Edit Collection Name'
                            autoFocus
                            autoComplete='off'
                            onChange={({ target: { value } }) => setCollectionName(value)}
                            value={collectionName} />
                        <button type="submit">Edit</button>

                    </form>
                    <div id="collection-form__edit-errors">
                        {showEditErrors
                            && (<div
                                style={{ color: 'red' }}>
                                {errors.map((err, ind) => (
                                    <div key={ind}>{err}</div>
                                ))}
                            </div>)
                        }
                    </div>
                </Modal>
            )}

        </>
    )
}
