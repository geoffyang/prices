import CollectionForm from "./CollectionForm"
import { useSelector } from "react-redux"
import CollectionsList from "./CollectionsList"
import Services from "./ServicesList"
import "./CollectionsPage.css"

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
                        ? (<div>
                            <h3>{all[currentId].name} </h3>
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


