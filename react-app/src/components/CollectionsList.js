import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetCollections, GetServices, UnloadCollections, DeleteCollection } from "../store/collection"
import { BsTrash, BsPencil } from 'react-icons/bs';
import './CollectionsList.css'

export default function CollectionsList() {
    const dispatch = useDispatch();
    const allCollections = useSelector(state => state.collections.all)

    useEffect(() => {
        dispatch(GetCollections());
        return () => dispatch(UnloadCollections());
    }, [dispatch]);

    const loadCollection = (id) => {
        dispatch(GetServices(id))
    }

    const editFunc = id => {
        // to do.
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
                            editFunc(c.id)
                        }} />
                        <BsTrash onClick={(e) => {
                            e.stopPropagation()
                            dispatch(DeleteCollection(c.id))
                        }} />
                    </div>
                </div>
            )

            )}
        </>
    )
}
