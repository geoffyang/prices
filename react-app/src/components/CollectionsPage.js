import CollectionForm from "./CollectionForm"
import "./CollectionsPage.css"
import CollectionsList from "./CollectionsList"
import {  useSelector } from "react-redux"

export default function CollectionsPage() {

    const currentCollectionId = useSelector(state => state.collections.current) || null
    // const collections = useSelector(state => state.collections.all) || null
    const singleLoaded = useSelector(state => state.collections.singleLoaded)

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
                <h3>{currentCollectionId} </h3>
                {
                    (singleLoaded
                        ? (<h1>true</h1>)
                        : <h1>false</h1>
                    )
                }
            </div>
        </div>
    )
}
