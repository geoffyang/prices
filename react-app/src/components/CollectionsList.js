import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetCollections, GetCollection, UnloadCollections , DeleteCollection} from "../store/collection"
import { BsTrash } from 'react-icons/bs';
import './CollectionsList.css'

export default function CollectionsList() {
    const dispatch = useDispatch();
    const allCollections = useSelector(state=>state.collections.all)

    useEffect(() => {
        dispatch(GetCollections());
        return () => dispatch(UnloadCollections());
    }, [dispatch]);

    const loadCollection = (id) => {
        dispatch(GetCollection(id))
    }

    const deleteFunc = id => {
        dispatch(DeleteCollection(id))
    }

    return (
        <>
            {Object.values(allCollections).map((c, i) => (
                <div className={"list__collection"}
                    key={i}
                    onClick={() => { loadCollection(c.id) }}
                >
                    {c.name} ------ {c.id}
                    <BsTrash onClick={(e) => {
                        e.stopPropagation()
                        deleteFunc(c.id)
                    }} />
                </div>
            )

            )}
        </>
    )
}
