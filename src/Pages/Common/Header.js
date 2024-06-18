import React, { useState, useEffect } from "react";
import { Link, json, useLocation, useNavigate, useParams } from "react-router-dom";
import './styles/Header.css'
import Container from "../../Components/Container";
import axios from "axios";
import classnames from "classnames";
import { useRecoilState } from "recoil";
import { isLoginAtom } from "../../Recoil/LoginAtom";

function Header ({userName, admin, token, kinderUrl, setKinderUrl}) {
    // 로그인 로그아웃시 이벤트처리
    // const [isLogin, setIsLogin] = useState(false) 

    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom)

    useEffect(()=>{
        userName && setIsLogin(true)
    },[userName])

    const logout = () => {
        alert('로그아웃 되었습니다.')
        localStorage.clear()
        setIsLogin(false)
    }

    const location = useLocation() // kinder-page체크용도

    // 관리자 페이지 생성시
    const [modalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate()

    const findKinderCode = async () => {
        if(!isLogin) alert('로그인 후 이용 가능합니다.')
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }
    const OutSideClick = (e) => {
        if(e.target.className === 'input-modal-bg'){
            toggleModal()
        }
    }

    // 관리자페이지 url생성하기
    const [createdUrl, setCreatedUrl] = useState()
    const urlValue = (e) => {
        setCreatedUrl(e.target.value)
    }

    const createPage = async () => {
        const {data} = await axios.post('platform/newpage',{
            createdUrl
        }, {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        alert(data.msg)
        if(data.code === 200){
            setKinderUrl(createdUrl)
            alert('관리자 페이지로 넘어갑니다.')
            navigate('/admin')
        }
    }

    const openLogin = (e) => {
        e.preventDefault()
        window.open(
            e.target.href,
            '_blank',
            `width=580 height=550
            top=100 left=150`
        )
    }

    return(
        <header className={classnames("header",{ small : location.pathname.includes('kinder') })}>
            <Container>
                <nav>
                    <button className="logo" onClick={()=>{navigate('/')}}> <img src={`${origin}/main/logo.png`}/> </button>
                    <ul className="depth1">
                        <li><Link to={'service/info'}>유치원 모으미란</Link>
                            <ul className="depth2">
                                <li><Link to={'/service/info'}>서비스 안내</Link></li>
                                <li><Link to={'/service/introduce'}>공시항목 소개</Link></li>
                                <li><Link>관련법령</Link></li>
                                <li><Link>홍보자료</Link></li>
                            </ul>
                        </li>
                        <li><Link to={'search'}>유치원 정보</Link>
                            <ul className="depth2">
                                <li><Link to={'search'}>유치원 조회</Link></li>
                                <li><Link to={'search'}>유치원 비교</Link></li>
                                <li><Link to={'search'}>정보공시지표</Link></li>
                            </ul>
                        </li>
                        <li><Link>공지사항</Link></li>
                        <li><Link>커뮤니티</Link></li>
                        <li><Link>교사채용</Link>
                            <ul className="depth2">
                                <li><Link>면접경험</Link></li>
                                <li><Link>필기경험</Link></li>
                                <li><Link>상담코너</Link></li>
                                <li><Link>교사채용</Link></li>
                                <li><Link>채용준비</Link></li>
                            </ul>
                        </li>
                        <li><Link to={isLogin ? `/kinder/${kinderUrl}` : '/'} onClick={findKinderCode}>내 유치원</Link></li>
                        {isLogin && admin && <li><Link to={kinderUrl ? '/admin' : '/'} 
                        onClick={()=>!kinderUrl && alert('페이지 생성을 먼저 해주세요')}>관리자 페이지</Link>
                            <ul className="depth2">
                                {!kinderUrl && <li><Link onClick={toggleModal}>페이지 생성</Link></li>}
                                {kinderUrl && 
                                <>
                                    <li><Link to={'/admin'}>페이지 관리</Link></li>
                                    <li><Link to={'/admin'}>원아 관리</Link></li>
                                    <li><Link to={'/admin'}>식단 관리</Link></li>
                                </>
                                }
                            </ul>
                        </li>}
                    </ul>
                    {!isLogin ? 
                    <ul className="user-nav">
                        <li><Link to={'user/login'} onClick={openLogin}>로그인</Link></li>
                        <li><Link to={'user/join'}>회원가입</Link></li>
                    </ul>:
                    <ul className="user-nav">
                        <li>{userName && userName}{admin && '(관리자)'}</li>
                        <li onClick={logout}><Link>{isLogin && '로그아웃'}</Link></li>
                    </ul>
                    }
                </nav>
            </Container>
            {modalOpen &&
            <section className="input-modal-bg" onClick={OutSideClick}>
                <div className="input-modal">
                    <div className="description">
                        <p>유치원 URL을 생성해주세요</p>
                        {/* <span>*URL : 사용자에 대한 위치에 대한 이름입니다.</span> */}
                        <span>*예시 : http://www.kindermoumi.com/ [URL] </span>
                        <span className="red">걱정마세요! 나중에 다시 수정할 수 있어요! </span>
                    </div>
                    <div className="input-box">
                        <input placeholder={'URL 입력'} onChange={urlValue}/>
                        <button onClick={createPage}>확인</button>
                    </div>
                </div>
            </section>}
        </header>
    )
}

export default Header