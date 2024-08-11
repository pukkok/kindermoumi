import React, {useState, useEffect} from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { JoinPage, LoginPage, MainPage, NotFoundPage, SearchPage } from './Pages'
import './App.css'
import PlatformPage from './Pages/Platform/PlatformPage';
import ServicePage from './Pages/Service/ServicePage';
import Header from './Pages/Common/Header';
import Footer from './Pages/Common/Footer';
import AdminPage from './Pages/Admin/AdminPage';

import { axiosKinderAllData } from './Components/axiosData'
import sggData from './Datas/sggData';
import Origami from './Pages/Edu/Origami';
import { useRecoilValue } from 'recoil';
import { headerPaddingTopAtom } from './Recoil/CommonAtom';
import NoticePage from './Pages/Notice/NoticePage';
import MusicPage from './Pages/Edu/MusicStudy/MusicPage';

function App() {

    //검색 전체 데이터
    const [allData, setAllData] = useState([]) // 전체 데이터
    const headerPaddingTop = useRecoilValue(headerPaddingTopAtom)
    const userName = JSON.parse(localStorage.getItem('user'))
    const admin = JSON.parse(localStorage.getItem('admin'))
    const token = JSON.parse(localStorage.getItem('token'))
    
    useEffect(()=>{ // 초기 랜더링
        axiosKinderAllData(sggData, setAllData) // 전체 데이터 불러오기
    },[])

    const UseCommon = ({userName, admin, token}) => {
        return(
            <>
                <Header userName={userName} admin={admin} token={token}/>
                <Outlet/>
                <Footer/>
            </>
        )
    }

    return (
        <div className="App" style={{paddingTop : headerPaddingTop + 'px'}}>
            <Routes>
                <Route element={<UseCommon userName={userName} admin={admin} token={token}/>}>
                    <Route exact path='/' element={<MainPage loading={allData.length > 0}/>}/>
                    <Route exact path='/service/*' element={<ServicePage/>}/>
                    <Route exact path='/notice/*' element={<NoticePage/>}/>
                    <Route exact path='/search/:serviceName' element={<SearchPage allData={allData}/>}/>
                    <Route exact path='/edu/:study' element={<MusicPage />}/>
                    <Route path='/kinder/:kinderUrl/*' element={<PlatformPage/>}/>
                </Route>
                <Route path='user'>
                    <Route exact path='login' element={<LoginPage/>}/>
                    <Route exact path='join' element={<JoinPage/>}/>
                </Route>
                <Route path='admin' element={<AdminPage/>}/>
                <Route path='paper' element={<Origami/>}></Route>
                <Route exact path='*' element={<NotFoundPage />}/>
            </Routes>
        </div>
    )
}

export default App;