import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

import DomainPanel from './DomainPanel'

import "./Splash.css"

export default function Splash() {
    const history = useHistory();

    const panel1 = (<DomainPanel
        title="COVID-19?"
        text="Explore testing and treatment options for COVID-19"
        domain="Virology"
        color="rgb(105, 147, 255)"
        textColor="black"
        learnMore="Learn More >"
        link="/subdomains/covid/"
    />)

    const panel2 = (<DomainPanel
        title="Coming Soon"
        text="New pricing categories coming soon"
        domain="Coming Soon"
        link="/"
        color="rgb(41,41,41,.2)"
        textColor="rgb(41,41,41,.5"
        learnMore=""
    />)

    const displayArray = [
        panel1, panel2
    ]

    const user = useSelector(state => state.session.user);

    return (<>

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
                        <button style={{ border: "4px solid white" }} onClick={() => history.push('/login')}>Learn More</button>
                    </div>)
                }
                <img className="splash-image" src="/splash.jpg" alt="background texture" />
            </div>
        </div>


        <div id="splash-p2" className="splash-panel">
            <div id="splash-p2__left">
                <span id="splash__features-explanation">
                    Explore featured services below.
                </span>

            </div>
            <div id="splash-p2__right">

            </div>
        </div>
        <div id="splash-p3" className="splash-panel">
            <div id="splash-p3__left">

                {displayArray}

            </div>
        </div>

    </>)
}
