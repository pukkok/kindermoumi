import React from "react";
import Navigator from "../Common/Navigator";
import navData from "../../Datas/navData";
import Container from "../../Components/Container";
import UpdateInfo from "./UpdateInfo";
import HeadLine from "../Common/HeadLine";
import UpdateDetailPage from "./UpdateDetailPage";
import { Route, Routes } from "react-router-dom";
import { updateDatas } from "../../Datas/UpdateData";
import './styles/NoticePage.css'

function NoticePage () {
    const {main, sub, list} = navData.notice

    return(
        <section className="notice-page">
            <Navigator main={main} sub={sub} list={list}/>
            <Container>
                <HeadLine depth1={main} depth2={list[0].description}/>
                <Routes>
                    <Route path="update" element={<UpdateInfo updateDatas={updateDatas}/>} />
                    <Route path="update/:updateNum" element={<UpdateDetailPage updateDatas={updateDatas}/>} />
                </Routes>
            </Container>
        </section>
    )
}

export default NoticePage