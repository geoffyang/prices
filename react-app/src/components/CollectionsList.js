import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetCollections , GetCollection, UnloadCollections} from "../store/collection"
import './CollectionsList.css'

export default function CollectionsList() {
    const dispatch = useDispatch();
    const allCollections = useSelector(state=>state.collections.all)

    useEffect(() => {
        dispatch(GetCollections());
        return () => dispatch(UnloadCollections());
    }, [dispatch]);

    const loadCollection = (id) => {
        console.log("want to load ", id);
        dispatch(GetCollection(id))
    }

    return (
        <>
            {Object.values(allCollections).map((collec, i) => (
                <div className={"list__collection"}
                    key={i}
                    onClick={() => { loadCollection(collec.id) }}
                >
                    {collec.name} |
                    {collec.id} | 
                    {collec.user_id}
                </div>
            )

            )}
        </>
    )
}
