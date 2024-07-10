import React from "react";
import Container from "../../Components/Container";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useParams } from "react-router-dom";

function Navigator ({main, sub, list}) {

    const { serviceName } = useParams()
    console.log(serviceName)
    return(
        <nav className="common-nav">
            <h1>{main}</h1>
            <p>{sub}</p>
            <Container>
                <ul>
                    {list && list.map((item, idx) => {
                        const {active, link, description} = item
                        return <li key={idx} className={classNames({active : serviceName === active})}>
                            <Link to={link}>{description}</Link>
                        </li>
                    })}
                </ul>
            </Container>
        </nav>
    )
}

export default Navigator