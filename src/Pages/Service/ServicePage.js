import React from "react";
import ServiceInfo from "./ServiceInfo";
import './styles/ServicePage.css'
import ServiceIntroduce from "./ServiceIntroduce";
import Container from '../../Components/Container'
import { Link, useParams } from "react-router-dom";
import classnames from 'classnames'

function ServicePage () {

    const {serviceName} = useParams()

    return (
        <section className="service-info">
            <nav className="common-nav">
                <h1>유치원 모으미란</h1>
                <p>유치원 모으미 사이트를 소개합니다</p>
                <Container>
                    <ul>
                        <li className={classnames({active : serviceName === 'info'})}><Link to={`/service/info`}>서비스 안내</Link></li>
                        <li className={classnames({active : serviceName === 'introduce'})}><Link to={'/service/introduce'}>공시항목 소개</Link></li>
                        <li><Link >관련법령</Link></li>
                        <li><Link >홍보자료</Link></li>
                    </ul>
                </Container>
            </nav>
            <Container>
                {serviceName === 'info' && <ServiceInfo/>}
                {serviceName === 'introduce' && <ServiceIntroduce/>}
            </Container>
        </section>
    )
}

export default ServicePage