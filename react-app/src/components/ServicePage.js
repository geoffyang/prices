import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import "./ServicePage.css"
import {
    GetService,
    // UnloadService
} from "../store/service";
import Comments from "./Comments"
import CommentsForm from "./CommentsForm"

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
                    <div id="breadcrumbs">Services</div>
                    <div id="service-name">
                        <div id="service-description" >{s.service_description}
                        </div>
                        <div id="billing-code" className="labels"> Billing Code
                            <span id="service-description-code" >{s.billing_code}</span>
                        </div>
                    </div>

                    <div id="service__about" className="service__section" >
                        <div id="service__about__left" className="service__left-column">About</div>

                        <div className="service__middle-spacer"> </div>

                        <div id="service__about__right" className="service__right-column">

                            <div className=" service-grid-stats"> List Price
                                <div className="service__grid-values">${s.list_price.toFixed(2)}</div>
                            </div>

                            <div className=" service-grid-stats"> Discounted Price
                                <div className="service__grid-values">${s.discounted_price.toFixed(2)}</div>
                            </div>

                            <div className=" service-grid-stats"> CPT Code
                                <div className="service__grid-values">{s.cpt_code}</div>
                            </div>

                            <div className=" service-grid-stats"> Hospital ID
                                <div className="service__grid-values">{s.hospital_id}</div>
                            </div>


                        </div>
                    </div>
                </div >
                <div id="service__comments" className="service__section">


                    <div id="service__about__left" className="service__left-column">Comments</div>



                    <div className="service__middle-spacer"> </div>



                    <div className="service__right-column" id="comments-vertical">

                        <div id="comments-form">
                            <CommentsForm />
                        </div>
                        <div id="comments-list">
                            <Comments />
                        </div>

                    </div>


                </div>
            </div >
        )
        : (<div id="service__top">
            <div id="breadcrumbs">Services</div>
            <div id="service-name">
                <div id="service-description" >That service does not exist
                </div>
                <div id="billing-code" className="labels"> Billing Code
                    <span id="service-description-code" >n/a</span>
                </div>
            </div>

            <div id="service__about" className="service__section" >
                <div id="service__about__left" className="service__left-column">About</div>

                <div className="service__middle-spacer"> </div>

                <div id="service__about__right" className="service__right-column">

                    <div className=" service-grid-stats"> List Price
                        <div className="service__grid-values">n/a</div>
                    </div>

                    <div className=" service-grid-stats"> Discounted Price
                        <div className="service__grid-values">n/a</div>
                    </div>

                    <div className=" service-grid-stats"> CPT Code
                        <div className="service__grid-values">n/a</div>
                    </div>

                    <div className=" service-grid-stats"> Hospital ID
                        <div className="service__grid-values">n/a</div>
                    </div>


                </div>
            </div>
        </div >)
    )
}
