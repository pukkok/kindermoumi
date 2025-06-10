import React, { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import './styles/Header.css'
import Container from "../../Components/Container"
import axios from "axios"
import classnames from "classnames"
import { useRecoilState, useSetRecoilState } from "recoil"
import { headerPaddingTopAtom, isLoginAtom, kinderUrlAtom } from "../../Recoil/CommonAtom"
import { adminThemeAtom, moveLinkAtom } from "../../Recoil/AdminAtom"

const navItems = [
  {
    title: '유치원 모으미란',
    sub: [
      { label: '서비스 안내', to: '/service/info' },
      { label: '공시항목 소개', to: '/service/introduce' },
      { label: '관련법령', disabled: true },
      { label: '홍보자료', disabled: true }
    ]
  },
  {
    title: '유치원 정보',
    sub: [
      { label: '유치원 조회', to: '/search/find' },
      { label: '유치원 비교', disabled: true },
      { label: '정보공시지표', disabled: true }
    ]
  },
  {
    title: '공지사항',
    sub: [
      { label: '업데이트 안내', to: '/notice/update' },
      { label: '이벤트', disabled: true },
      { label: 'FAQ', disabled: true },
    ]
  },
  { title: '커뮤니티', disabled: true },
  {
    title: '아이교육',
    sub: [
      { label: '음악교실', to: '/edu/music' },
      { label: '미술교실', disabled: true },
      { label: '수학교실', disabled: true },
      { label: '영어교실', disabled: true }
    ]
  },
  // {
  //   title: '교사채용',
  //   sub: [
  //     { label: '면접경험', disabled: true },
  //     { label: '필기경험', disabled: true },
  //     { label: '상담코너', disabled: true },
  //     { label: '교사채용', disabled: true },
  //     { label: '채용준비', disabled: true }
  //   ]
  // }
]

function Header({ userName, admin, token }) {
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom)
  const [kinderUrl, setKinderUrl] = useRecoilState(kinderUrlAtom)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const setHeaderPaddingTop = useSetRecoilState(headerPaddingTopAtom)
  const setAdminTheme = useSetRecoilState(adminThemeAtom)
  const setMoveLink = useSetRecoilState(moveLinkAtom)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    if (userName) {
      setIsLogin(true)

      const findKinderCode = async () => {
        const { data } = await axios.post('user/kinderUrl', {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (data.code === 200) setKinderUrl(data.url)
      }

      findKinderCode()
    }
  }, [userName, token, setIsLogin])

  useEffect(() => {
    setHeaderPaddingTop(location.pathname.includes('kinder') ? 40 : 60)
  }, [location])

  const logout = () => {
    alert('로그아웃 되었습니다.')
    localStorage.clear()
    setKinderUrl('')
    setIsLogin(false)
    navigate('/')
  }

  const loginCheck = () => {
    if (!isLogin) alert('로그인 후 이용 가능합니다.')
  }

  const openLogin = (e) => {
    e.preventDefault()
    window.open(
      e.target.href,
      '_blank',
      `width=560,height=550,top=100,left=150`
    )
  }

  const [modalOpen, setModalOpen] = useState(false)
  const [createdUrl, setCreatedUrl] = useState('')

  const toggleModal = () => setModalOpen(!modalOpen)
  const OutSideClick = (e) => {
    if (e.target.className === 'input-modal-bg') toggleModal()
  }

  const createPage = async () => {
    const { data } = await axios.post('platform/newpage', {
      createdUrl
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    alert(data.msg)
    if (data.code === 200) {
      setKinderUrl(createdUrl)
      alert('관리자 페이지로 넘어갑니다.')
      navigate('/admin')
    }
  }

  return (
    <header className={classnames("header", { "header--hidden": !isVisible, small: location.pathname.includes('kinder') })}>
      <Container>
        <nav>
          <button className="logo" onClick={() => navigate('/')}>
            <img src={`${origin}/main/logo.png`} alt="logo" />
          </button>

          <ul className="depth1">
            {navItems.map((item, idx) => (
              <li key={idx} className={classnames({ disabled: item.disabled })}>
                {item.disabled ? (
                  <span>{item.title}</span>
                ) : (
                  <Link to={item.to || '#'}>{item.title}</Link>
                )}
                {item.sub && (
                  <ul className="depth2">
                    {item.sub.map((subItem, subIdx) => (
                      <li key={subIdx} className={classnames({ disabled: subItem.disabled })}>
                        {subItem.disabled ? (
                          <span>{subItem.label}</span>
                        ) : (
                          <Link to={subItem.to || '#'}>{subItem.label}</Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            <li>
              <Link to={isLogin ? `/kinder/${kinderUrl}` : '/'} onClick={loginCheck}>내 유치원</Link>
            </li>

            {isLogin && admin && (
              <li>
                <Link to={kinderUrl ? '/admin' : '/'} onClick={() => !kinderUrl && alert('페이지 생성을 먼저 해주세요')}>관리자 페이지</Link>
                <ul className="depth2">
                  {!kinderUrl && <li><Link onClick={toggleModal}>페이지 생성</Link></li>}
                  {kinderUrl && (
                    <>
                      <li onClick={() => setAdminTheme('page')}><Link to="/admin">페이지 관리</Link></li>
                      <li className="disabled"><span>원아 관리</span></li>
                      <li onClick={() => {
                        setAdminTheme('menus')
                        setMoveLink('menu-table')
                      }}><Link to="/admin">식단 관리</Link></li>
                    </>
                  )}
                </ul>
              </li>
            )}
          </ul>

          {!isLogin ? (
            <ul className="user-nav">
              <li><Link to="/user/login" onClick={openLogin}>로그인</Link></li>
              <li><Link to="/user/join">회원가입</Link></li>
            </ul>
          ) : (
            <ul className="user-nav">
              <li>{userName}{admin && '(관리자)'}</li>
              <li onClick={logout}><Link>로그아웃</Link></li>
            </ul>
          )}
        </nav>
      </Container>

      {modalOpen && (
        <section className="input-modal-bg" onClick={OutSideClick}>
          <div className="input-modal">
            <div className="description">
              <p>유치원 URL을 생성해주세요</p>
              <span>*예시 : http://www.kindermoumi.com/ [URL]</span>
              <span className="red">걱정마세요! 나중에 다시 수정할 수 있어요!</span>
            </div>
            <div className="input-box">
              <input placeholder="URL 입력" onChange={e => setCreatedUrl(e.target.value)} />
              <button onClick={createPage}>확인</button>
            </div>
          </div>
        </section>
      )}
    </header>
  )
}

export default Header
