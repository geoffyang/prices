import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import "./ServicePage.css"
import { GetService } from "../store/services";

export default function ServicePage() {
    const dispatch = useDispatch();

    let { id } = useParams()
    const s = useSelector(state => state.services.current)
    const isLoaded = useSelector(state => state.services.isLoaded)

    useEffect(() => {
        dispatch(GetService(id))
    }, [dispatch, id])

    return (isLoaded
        ? (

            <div>

                <div id="service__top">

                    <div> Service number
                        <span className="values">{id}</span>
                    </div>
                    <div> Billing Code
                        <span className="values">{s.billing_code}</span>
                    </div>
                    <div> CPT Code
                        <span className="values">{s.cpt_code}</span>
                    </div>
                    <div> Service Description
                        <span className="values">{s.service_description}</span>
                    </div>
                    <div> List Price
                        <span className="values">{s.list_price.toFixed(2)}</span>
                    </div>
                    <div> Discounted Price
                        <span className="values">{s.discounted_price.toFixed(2)}</span>
                    </div>
                </div>

                <div id="service__bottom">

                    <div>

                    </div>
                </div>

            </div>
        )
        : <h3>That service doesn't exist</h3>
    )
}
