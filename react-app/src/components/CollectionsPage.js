import CollectionForm from "./CollectionForm"
import "./CollectionsPage.css"
import CollectionsList from "./CollectionsList"
import { useSelector } from "react-redux"

export default function CollectionsPage() {

    const currentId = useSelector(state => state.collections.current) || null
    // const collections = useSelector(state => state.collections.all) || null
    const singleLoaded = useSelector(state => state.collections.singleLoaded)
    const all = useSelector(state => state.collections.all)

    return (
        <div id="collections__container">
            < div id="collections__left" style={{ backgroundColor: "lightblue" }}>
                <div id="collections__left-form">
                    <CollectionForm />
                </div>
                <div id="collections__left-show"
                    style={{ backgroundColor: "gray" }}>
                    <CollectionsList />
                </div>
            </div >

            <div id="collections__right">

                {
                    (singleLoaded
                        ? (<h3>{all[currentId].name} </h3>)
                        : <h1>Choose a collection from the list</h1>
                    )
                }
            </div>
        </div>
    )
}
