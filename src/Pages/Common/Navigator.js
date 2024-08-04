import React from "react";
import Container from "../../Components/Container";
import { Link, useHref } from "react-router-dom";
import classNames from "classnames";
import { useParams } from "react-router-dom";

// 페이지 상단 파란 박스
function Navigator ({main, sub, list}) {

    const href = useHref()
    const { serviceName } = useParams()
    
    
    return(
        <nav className="common-nav">
            <h1>{main}</h1>
            <p>{sub}</p>
            <Container>
                <ul>
                    {list && list.map((item, idx) => {
                        const {active, link, description} = item
                        return <li key={idx} className={classNames({active : serviceName === active || link === href})}>
                            <Link to={link}>{description}</Link>
                        </li>
                    })}
                </ul>
            </Container>
        </nav>
    )
}

export default Navigator