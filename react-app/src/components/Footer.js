import "./Footer.css"


export default function Footer() {

    return (
        <div id='footer__container'>

            <div id="footer__left">
                <a href='https://geoffyang.github.io'>Made by<br /> Geoffrey Yang </a>
            </div>


            <div className="service__middle-spacer"> </div>

            <div id="footer__right" className="service__right-column">
                <a href="https://www.linkedin.com/in/geoffreyy">Linkedin</a>
                <a href="https://www.github.com/geoffyang"> Github</a>
                <a href="https://www.github.com/geoffyang/prices">Code Repo</a>
            </div>


        </div >
    )
}

