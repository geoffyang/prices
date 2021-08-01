import MakeCollectionForm from "./MakeCollectionForm"
import "./CollectionsPage.css"
import CollectionsList from "./CollectionsList"

export default function CollectionsPage() {


    return (
        <div id="collections__container">
            < div id="collections__left" style={{ backgroundColor: "lightblue" }}>
                <div id="collections__left-form">
                    <MakeCollectionForm />
                </div>
                <div id="collections__left-show"
                    style={{ backgroundColor: "gray" }}>
                    <h3>show collections</h3>
                    <CollectionsList/>
                </div>
            </div >

            <div id="collections__right">
                <h3>collections right</h3>
            </div>
        </div>
    )
}
