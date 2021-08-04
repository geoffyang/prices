import CollectionForm from "./CollectionForm"
import { useSelector } from "react-redux"
import CollectionsList from "./CollectionsList"
import Services from "./ServicesList"
import "./CollectionsPage.css"

export default function CollectionsPage() {

    const collectionId = useSelector(state => state.collections.current) || null
    const collectionLoaded = useSelector(state => state.collections.collectionLoaded)
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
                    (collectionLoaded
                        ? (<div>
                            <h3>{all[collectionId].name} </h3>
                            <Services />
                            </div>
                        )
                        : <h1>Choose a collection from the list</h1>
                    )
                }
            </div>
        </div>
    )
}


