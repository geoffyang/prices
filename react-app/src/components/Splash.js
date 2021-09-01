import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

import DomainPanel from './DomainPanel'

import "./Splash.css"

export default function Splash() {
    const history = useHistory();

    const user = useSelector(state => state.session.user);

    return (<div id="splash-container">

        <div id="splash-p1" className="splash-panel">
            <div id="splash-p1__left">
                <span id="splash__title">
                    Access transparent hospital pricing.
                </span>
                <span>
                    View recent prices for hospital services and procedures.
                </span>
            </div>
            <div style={{ position: 'relative' }}>

                {(user === null) &&
                    (<div id="splash-p1__right">
                        <button style={{ border: "1px solid white" }} onClick={() => history.push('/login')}>Learn More</button>
                    </div>)
                }
            </div>
        </div>

        <div id="splash-p2" className="splash-panel">
            <div id="splash-p2__left">

                Know how much your next medical procedure will cost.


            </div>
            <div id="splash-p2__right">
                New 2021 federal regulations mandate that hospitals publish price information on their services and procedures. This is a data tool to help access and explore this rich set of data. We aim to promote transparency in medical pricing and allow people to make informed decisions about their healthcare.

            </div>
        </div>


        <div id="splash-p3" className="splash-panel">
            <div id="splash-p3__left">
                <span id="splash__features-explanation">
                    Explore featured services below.
                </span>

            </div>
            <div id="splash-p3__right">

            </div>
        </div>


        <div id="splash-p4" className="splash-panel">
            <div id="splash-p4__left">

                <DomainPanel
                    title="COVID-19?"
                    text="Explore testing and treatment options for COVID-19"
                    domain="Virology"
                    color="rgb(105, 147, 255)"
                    textColor="black"
                    learnMore="Learn More >"
                    link="/subdomains/covid/"
                />

                <DomainPanel
                    title="Coming Soon"
                    text="New pricing categories coming soon"
                    domain="Coming Soon"
                    link="/"
                    color="rgb(41,41,41,.2)"
                    textColor="rgb(41,41,41,.5"
                    learnMore=""
                />

            </div>
        </div>

    </div>)
}
