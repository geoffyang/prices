import "./DomainPanel.css"

export default function DomainPanel({ domain, title, text, link, color, textColor, learnMore }) {

    return (<>
        <div id="domain-panel" style={{ "backgroundColor": color, color: textColor }}>


            <div id="domain-panel__top">
                {domain}
            </div>


            <div id="domain-panel__middle">
                <div id="domain-panel__middle-title">{title}</div>
                <div id="domain-panel__middle-text">{text}</div>
            </div>


            <div id="domain-panel__bottom">
                <span >{learnMore}</span>
            </div>


        </div>
    </>)
}
