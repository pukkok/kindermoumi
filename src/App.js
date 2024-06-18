import React, {useState, useEffect} from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { JoinPage, LoginPage, MainPage, NotFoundPage, SearchPage } from './Pages'
import './App.css'
import PlatformPage from './Pages/Platform/PlatformPage';
import ServicePage from './Pages/Service/ServicePage';
import Header from './Pages/Common/Header';
import Footer from './Pages/Common/Footer';
import AdminPage from './Pages/Platform/AdminPage/AdminPage';
import axios from "axios";

import { axiosKinderAllData } from './Components/axiosData'
import sggData from './Datas/sggData';

function App() {

    //검색 전체 데이터
    const [allData, setAllData] = useState([]) // 전체 데이터
    
    const userName = JSON.parse(localStorage.getItem('user'))
    const admin = JSON.parse(localStorage.getItem('admin'))
    const token = JSON.parse(localStorage.getItem('token'))

    useEffect(()=>{
        if(userName){
        const findKinderCode = async () => {
            const {data} = await axios.post('user/kinderUrl', {},
            {headers : {'Authorization' : `Bearer ${token}`}})
            if(data.code === 200){
                setKinderUrl(data.url)
            }
        }
        findKinderCode()
        }
    },[userName])
    
    useEffect(()=>{ // 초기 랜더링
        axiosKinderAllData(sggData, setAllData) // 전체 데이터 불러오기
    },[])

    const [kinderUrl, setKinderUrl] = useState()

    const UseCommon = ({userName, admin, token, kinderUrl, setKinderUrl}) => {
        return(
            <>
                <Header userName={userName} admin={admin} token={token} kinderUrl={kinderUrl} setKinderUrl={setKinderUrl}/>
                <Outlet/>
                <Footer/>
            </>
        )
    }

  return (
    <div className="App">
        <Routes>
            <Route element={<UseCommon userName={userName} admin={admin} token={token} kinderUrl={kinderUrl} setKinderUrl={setKinderUrl}/>}>
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
  );
}

export default App;