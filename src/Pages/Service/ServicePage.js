import React from "react";
import ServiceInfo from "./ServiceInfo";
import './styles/ServicePage.css'
import ServiceIntroduce from "./ServiceIntroduce";
import Container from '../../Components/Container'
import { useParams } from "react-router-dom";
import Navigator from '../Common/Navigator'
import navData from "../../Datas/navData";

function ServicePage () {
    const {main, sub, list} = navData.service
    const {serviceName} = useParams()

    return (
        <section className="service-info">
            <Navigator main={main} sub={sub} list={list}/>
            <Container>
                {serviceName === 'info' && <ServiceInfo/>}
                {serviceName === 'introduce' && <ServiceIntroduce/>}
            </Container>
        </section>
    )
}

export default ServicePage