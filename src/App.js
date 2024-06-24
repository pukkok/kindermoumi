import React, {useState, useEffect} from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { JoinPage, LoginPage, MainPage, NotFoundPage, SearchPage } from './Pages'
import './App.css'
import PlatformPage from './Pages/Platform/PlatformPage';
import ServicePage from './Pages/Service/ServicePage';
import Header from './Pages/Common/Header';
import Footer from './Pages/Common/Footer';
import AdminPage from './Pages/Platform/AdminPage/AdminPage';


import { axiosKinderAllData } from './Components/axiosData'
import sggData from './Datas/sggData';

function App() {

    //검색 전체 데이터
    const [allData, setAllData] = useState([]) // 전체 데이터
    const userName = JSON.parse(localStorage.getItem('user'))
    const admin = JSON.parse(localStorage.getItem('admin'))
    const token = JSON.parse(localStorage.getItem('token'))
    
    useEffect(()=>{ // 초기 랜더링
        axiosKinderAllData(sggData, setAllData) // 전체 데이터 불러오기
    },[])

    const UseCommon = ({userName, admin, token, scrollDown}) => {
        return(
            <>
                <Header userName={userName} admin={admin} token={token} scrollDown={scrollDown}/>
                <Outlet/>
                <Footer/>
            </>
        )
    }

    const [wheelDown, setWheelDown] = useState(true)
    const [scrollDown, setScrollDown] = useState(true)
    const headerView = (e) => {
        console.log(e.deltaY)
        if(e.deltaY === 0) return
        e.deltaY>0 ? setWheelDown(true) : setWheelDown(false)
    }
    
    useEffect(()=>{
        if(wheelDown){
            setScrollDown(true)
        }else{
            setScrollDown(false)
        }
    },[wheelDown])

    return (
        <div className="App" onWheel={headerView}>
            <Routes>
                <Route element={<UseCommon userName={userName} admin={admin} token={token} scrollDown={scrollDown}/>}>
                    <Route exact path='/' element={<MainPage/>}/>
                    <Route exact path='/service/:serviceName' element={<ServicePage/>}/>
                    <Route exact path='/search' element={<SearchPage allData={allData}/>}/>
                    <Route path='/kinder/:kinderUrl/*' element={<PlatformPage/>}/>
                </Route>
                <Route path='user'>
                    <Route exact path='login' element={<LoginPage/>}/>
                    <Route exact path='join' element={<JoinPage/>}/>
                </Route>
                <Route path='admin' element={<AdminPage/>}/>
                <Route exact path='*' element={<NotFoundPage />}/>
            </Routes>
        </div>
    )
}

export default App;