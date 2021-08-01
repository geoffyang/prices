import { useEffect } from "react"
import { useSelector } from "react-redux"


export default function CollectionsList() {

    const collections = useSelector(state=>state.collections)

    useEffect(() => {
        
    }, [])


    return (
        <>

        </>
    )
}
