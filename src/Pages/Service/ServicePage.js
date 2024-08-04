import React from "react";
import ServiceInfo from "./ServiceInfo";
import './styles/ServicePage.css'
import ServiceIntroduce from "./ServiceIntroduce";
import Container from '../../Components/Container'
import { Route, Routes } from "react-router-dom";
import Navigator from '../Common/Navigator'
import navData from "../../Datas/navData";

function ServicePage () {
    const {main, sub, list} = navData.service

    return (
        <section className="service-info">
            <Navigator main={main} sub={sub} list={list}/>
            <Container>
                <Routes>
                    <Route path="/info" element={<ServiceInfo depth1={main} depth2={list[0].description}/>}/>
                    <Route path="/introduce" element={<ServiceIntroduce depth1={main} depth2={list[1].description}/>}/>
                </Routes>
            </Container>
        </section>
    )
}

export default ServicePage