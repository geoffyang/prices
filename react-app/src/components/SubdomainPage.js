import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import "./SubdomainPage.css"
import { GetSubdomain, UnloadSubdomain } from "../store/subdomain";

export default function SubdomainPage() {
    const dispatch = useDispatch();
    let history = useHistory()

    const { subdomain } = useParams()

    const services = useSelector(state => state.subdomain.services)
    const servicesLoaded = useSelector(state => state.subdomain.servicesLoaded)

    useEffect(() => {
        dispatch(GetSubdomain(subdomain))
        return () => dispatch(UnloadSubdomain())
    }, [dispatch, subdomain])



    return (servicesLoaded
        ? (
            <div id="subdomain__container">


                <div id="subdomain__list">

                    <div className="subdomain__services" id="subdomain__table-header">
                        <span>Billing Code</span>
                        <span>Service Description</span>
                        <span>List Price</span>
                        <span>Discounted Price</span>
                    </div>
                    {Object.values(services).map((s, i) => (

                        <div className="subdomain__services"
                            key={i}
                            onClick={e => {
                                e.stopPropagation()
                                history.push(`/services/${s.id}/`)
                            }}
                        >
                            <span>{s.billing_code}</span>
                            <span>{s.service_description}</span>
                            <span>${s.list_price.toFixed(2)}</span>
                            <span>${s.discounted_price.toFixed(2)}</span>
                        </div>

                    ))}


                </div>
            </div>
        )
        : (
            <div>
                Sorry that subdomain doesn't exist.
            </div>
        )

    )
}
