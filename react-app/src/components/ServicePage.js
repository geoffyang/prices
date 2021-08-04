import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import "./ServicePage.css"
import { GetService, UnloadService } from "../store/service";
import Comments from "./Comments"

export default function ServicePage() {
    const dispatch = useDispatch();

    let { id } = useParams()
    const s = useSelector(state => state.service.currentServiceObj)
    const serviceLoaded = useSelector(state => state.service.serviceLoaded)

    useEffect(() => {
        dispatch(GetService(id))
        // return () => dispatch(UnloadService())
    }, [dispatch, id])

    return (serviceLoaded
        ? (

            <div>

                <div id="service__top">
                    <div className="labels"> Service number
                        <span className="values">{id}</span>
                    </div>
                    <div className="labels"> Billing Code
                        <span className="values">{s.billing_code}</span>
                    </div>
                    <div className="labels"> CPT Code
                        <span className="values">{s.cpt_code}</span>
                    </div>
                    <div className="labels"> Service Description
                        <span className="values">{s.service_description}</span>
                    </div>
                    <div className="labels"> List Price
                        <span className="values">{s.list_price.toFixed(2)}</span>
                    </div>
                    <div className="labels"> Discounted Price
                        <span className="values">{s.discounted_price.toFixed(2)}</span>
                    </div>
                </div>

                <div id="service__bottom">
                    <Comments />
                </div>

            </div>
        )
        : <h3>That service doesn't exist</h3>
    )
}
