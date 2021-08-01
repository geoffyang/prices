import MakeCollectionForm from "./MakeCollectionForm"
import "./CollectionsPage.css"
import CollectionsList from "./CollectionsList"
import { useSelector } from "react-redux"

export default function CollectionsPage() {

    const currentCollectionId = useSelector(state => state.collections.current)

    return (
        <div id="collections__container">
            < div id="collections__left" style={{ backgroundColor: "lightblue" }}>
                <div id="collections__left-form">
                    <MakeCollectionForm />
                </div>
                <div id="collections__left-show"
                    style={{ backgroundColor: "gray" }}>
                    <CollectionsList/>
                </div>
            </div >

            <div id="collections__right">
                <h3>collection number { currentCollectionId}</h3>
            </div>
        </div>
    )
}
