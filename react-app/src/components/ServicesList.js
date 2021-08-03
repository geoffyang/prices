import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { BsTrash } from 'react-icons/bs';
import { DeleteService } from '../store/collection'
import './ServicesList.css'

export default function Services() {
    let history = useHistory()
    let dispatch = useDispatch()

    const services = useSelector(state => state.collections.services)
    const current = useSelector(state => state.collections.current)
    const servicesLoaded = useSelector(state => state.collections.servicesLoaded)

    function redirect_single_service(id) {
        history.push(`/services/${id}/`)
        return {}
    }
    return (
        <>
            {
                (servicesLoaded
                    ? (Object.values(services).map((s, i) => (
                        <div key={i}
                            className={"services-list"}
                            onClick={() => redirect_single_service(s.id)}
                        >
                            <span>{s.billing_code}</span>
                            <span>{s.service_description}</span>
                            <span>${s.list_price}</span>
                            <span>${s.discounted_price}</span>
                            <span><BsTrash onClick={(e) => {
                                e.stopPropagation()
                                dispatch(DeleteService(current, s.id))
                            }} /></span>
                        </div>
                    )))
                    : <h1> No services in this collection</h1>
                )
            }

        </>
    )
}
