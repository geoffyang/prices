import CollectionForm from "./CollectionForm"
import { useSelector } from "react-redux"
import CollectionsList from "./CollectionsList"
import ServicesList from "./ServicesList"
import "./CollectionsPage.css"

export default function CollectionsPage() {

    const collectionId = useSelector(state => state.collections.current) || null
    const collectionLoaded = useSelector(state => state.collections.collectionLoaded)
    const noCollectionsToDisplay = useSelector(state => state.collections.noCollectionsToDisplay)
    const all = useSelector(state => state.collections.all)

    return (
        <>
            <div id="collection__breadcrumb" >
                <div id="collection__breadcrumb-inner">My Collections</div>
            </div>

            <div id="collections__container">

                < div id="collections__left" >
                    <div id="collections__left-form">
                        <CollectionForm />
                    </div>
                    <div id="collections__left-show">
                        <CollectionsList />
                    </div>
                </div >

                <div id="collections__right">

                    {collectionLoaded
                        ? (<div>
                            <div className="collection__header">{all[collectionId]?.name} </div>
                            <ServicesList />
                        </div>
                        )
                        : noCollectionsToDisplay
                            ? (<div className="collection__header" style={{ color: "red" }}> No collections to display </div>)
                            : (<div className="collection__header">Choose a collection from the list</div>)
                    }
                </div>
            </div>
        </>
    )
}


