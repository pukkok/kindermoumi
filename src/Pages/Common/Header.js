import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './styles/Header.css'
import Container from "../../Components/Container";
import axios from "axios";
import classnames from "classnames";
import { useRecoilState, useSetRecoilState } from "recoil";
import { headerPaddingTopAtom, isLoginAtom, kinderUrlAtom } from "../../Recoil/CommonAtom";
import { adminThemeAtom, moveLinkAtom } from "../../Recoil/AdminAtom";

function Header ({userName, admin, token}) {

    // 로그인 로그아웃시 이벤트처리 
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom)
    const [kinderUrl, setKinderUrl] = useRecoilState(kinderUrlAtom)
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }
            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY])

    useEffect(()=>{
        userName && setIsLogin(true)

        if(userName){ // 유저의 kinderurl 찾기
            const findKinderCode = async () => {
                const {data} = await axios.post('user/kinderUrl', {},
                {headers : {'Authorization' : `Bearer ${token}`}})
                if(data.code === 200){
                    setKinderUrl(data.url)
                }
            }
            findKinderCode()
        }

    },[userName, token, setIsLogin])

    const logout = () => {
        alert('로그아웃 되었습니다.')
        localStorage.clear()
        setKinderUrl('')
        setIsLogin(false)
        navigate('/')
    }

    const location = useLocation() // kinder-page체크용도
    const setHeaderPaddingTop = useSetRecoilState(headerPaddingTopAtom)
    useEffect(() => {
        location.pathname.includes('kinder') ?
        setHeaderPaddingTop(40) :
        setHeaderPaddingTop(60)
    }, [location])

    // 관리자 페이지 생성시
    const [modalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate()

    const loginCheck = () => {
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
            `width=560 height=550
            top=100 left=150`
        )
    }

    const setAdminTheme = useSetRecoilState(adminThemeAtom)
    const setMoveLink = useSetRecoilState(moveLinkAtom)
    return(
        <header className={classnames("header", { "header--hidden": !isVisible, small : location.pathname.includes('kinder') })}>
            <Container>
                <nav>
                    <button className="logo" onClick={()=>{navigate('/')}}> <img src={`${origin}/main/logo.png`} alt=""/> </button>
                    <ul className="depth1">
                        <li><Link to={'service/info'}>유치원 모으미란</Link>
                            <ul className="depth2">
                                <li><Link to={'/service/info'}>서비스 안내</Link></li>
                                <li><Link to={'/service/introduce'}>공시항목 소개</Link></li>
                                <li><Link>관련법령</Link></li>
                                <li><Link>홍보자료</Link></li>
                            </ul>
                        </li>
                        <li><Link to={'search/find'}>유치원 정보</Link>
                            <ul className="depth2">
                                <li><Link to={'/search/find'}>유치원 조회</Link></li>
                                <li><Link >유치원 비교</Link></li>
                                <li><Link >정보공시지표</Link></li>
                            </ul>
                        </li>
                        <li><Link to={'/notice/update'}>공지사항</Link>
                            <ul className="depth2">
                                <li><Link to={'/notice/update'}>업데이트 안내</Link></li>
                                <li><Link to={'/notice/FAQ'}>FAQ</Link></li>
                            </ul>
                        </li>
                        <li><Link>커뮤니티</Link></li>
                        <li><Link>아이교육</Link>
                            <ul className="depth2">
                                <li><Link to={'/edu/music'}>음악교실</Link></li>
                                <li><Link to={'/edu/art'}>미술교실</Link></li>
                                <li><Link to={'/edu/math'}>수학교실</Link></li>
                                <li><Link to={'/edu/eng'}>영어교실</Link></li>
                            </ul>
                        </li>
                        <li><Link>교사채용</Link>
                            <ul className="depth2">
                                <li><Link>면접경험</Link></li>
                                <li><Link>필기경험</Link></li>
                                <li><Link>상담코너</Link></li>
                                <li><Link>교사채용</Link></li>
                                <li><Link>채용준비</Link></li>
                            </ul>
                        </li>
                        <li><Link to={isLogin ? `/kinder/${kinderUrl}` : '/'} onClick={loginCheck}>내 유치원</Link></li>
                        {isLogin && admin && <li><Link to={kinderUrl ? '/admin' : '/'} 
                        onClick={()=>!kinderUrl && alert('페이지 생성을 먼저 해주세요')}>관리자 페이지</Link>
                            <ul className="depth2">
                                {!kinderUrl && <li><Link onClick={toggleModal}>페이지 생성</Link></li>}
                                {kinderUrl && 
                                <>
                                    <li onClick={()=>setAdminTheme('page')}><Link to={'/admin'}>페이지 관리</Link></li>
                                    <li><Link to={'/admin'}>원아 관리</Link></li>
                                    <li onClick={()=>{
                                        setAdminTheme('menus')
                                        setMoveLink('menu-table')
                                    }}><Link to={'/admin'}>식단 관리</Link></li>
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