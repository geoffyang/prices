import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BsTrash, BsPencil } from 'react-icons/bs';

import { GetCollections, GetServices, UnloadCollections, DeleteCollection, EditCollectionName } from "../store/collection"
import {Modal} from '../context/Modal'
import './CollectionsList.css'

export default function CollectionsList() {
    const dispatch = useDispatch();


    const [showModal, setShowModal] = useState(false);
    const [collectionId, setCollectionId] = useState("");
    const [collectionName, setCollectionName] = useState("")

    const allCollections = useSelector(state => state.collections.all)
    
    useEffect(() => {
        dispatch(GetCollections());
        return () => dispatch(UnloadCollections());
    }, [dispatch]);

    ///////// click handlers //////////
    const loadCollection = (id) => {
        dispatch(GetServices(id))
    }

    const handleEdit = e => {
        e.preventDefault();
        dispatch(EditCollectionName({
            name: collectionName,
            id: collectionId
        }))
        setCollectionName("")
        setCollectionId(null)
        setShowModal(false)
    }


    return (
        <>
            {Object.values(allCollections).map((c, i) => (
                <div className={"list__collection"}
                    key={i}
                    onClick={() => { loadCollection(c.id) }}
                >
                    {c.name} ------ {c.id}
                    <div id="list__collection-icons">
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
                <Modal onClose={() => setShowModal(false)}>
                    <form onSubmit={handleEdit}>
                        <input
                            type='text'
                            name='Edit Collection Name'
                            autoFocus
                            onChange={({ target: { value } }) => setCollectionName(value)}
                            value={collectionName} />
                        <button type="submit">Edit</button>
                    </form>
                </Modal>
            )}

        </>
    )
}
