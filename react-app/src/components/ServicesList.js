import { useSelector } from "react-redux"
import './ServicesList.css'

export default function Services() {

    const services = useSelector(state => state.collections.services)

    return (
        <>
            {
                Object.values(services).map((s, i) => (
                    <div key={i} className={"services-list"}>
                        <span>{s.billing_code}</span>
                        <span>{s.service_description}</span>
                        <span>{s.list_price}</span>
                        <span>{s.discounted_price}</span>
                    </div>
                ))
            }

        </>
    )
}
