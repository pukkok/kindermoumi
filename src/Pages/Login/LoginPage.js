import React, {useState} from "react";
import './styles/LoginPage.css'
import axios from "axios";

function LoginPage () {

    const [input, setInput] = useState({})

    const [switchType, setSwitchType] = useState('parent')

    const typeChecker = (e) =>{
        setSwitchType(e.target.value)
    }

    const login = async (e, input) => {
        e.preventDefault()
        const {userId, password} = input
        
        const { data } = await axios.post(`${switchType}/login`, {
               userId, password
        })

        if(data.code === 200){
            localStorage.setItem('token', JSON.stringify(data.token))
            localStorage.setItem('admin', JSON.stringify(data.data.isAdmin))
            localStorage.setItem('user', JSON.stringify(data.data.userId))
            alert('로그인 되었습니다.')
            window.close() // 본인 닫기
            window.opener.location.reload() // 열었던 창 리로드
        }else{
            alert(data.msg)
        }

    }

    const valueExtractor = (e) => {
        let {name, value} = e.target
        setInput({...input, [name] : value })
    }

    const moveJoinPage = () => {
        window.close()
        console.log(window.opener.location.replace('/user/join'))
    }

    return(
        <div className="login-box">
            <div className="header">
                <h1>LOGIN</h1>
                <p>로그인 이후 플랫폼 이용이 가능합니다.</p>
            </div>
            <div className="login-type">
                <label>
                    <input type="radio" name="type" value={'parent'} onClick={typeChecker} defaultChecked={true}/>학부모
                </label>
                <label>
                    <input type="radio" name="type" value={'teacher'} onClick={typeChecker} defaultChecked={false}/>교직원
                </label>
            </div>
            <form>
                <div>
                    <input type="text" placeholder="아이디" name="userId" onChange={valueExtractor}/>
                    <input type="password" placeholder="비밀번호" name="password" onChange={valueExtractor}/>
                </div>
                <button type="submit" onClick={e=>login(e, input)}>로그인 →</button>
            </form>
            <div className="small-box">
                <div>
                    <h2>아직 회원이 아니신가요?</h2>
                    <h3> 회원가입을 하시면 유치원에 대한 정보와 <br/> 다양한 서비스를 이용하실수 있습니다.</h3>
                    <button onClick={moveJoinPage}>회원가입 →</button>
                </div>
                <div>
                    <h2>아이디/비밀번호를 잊으셨나요?</h2>
                    <h3>회원님의 개인정보 또는 IPIN으로 <br/> 아이디/비밀번호를 찾을 수 있습니다.</h3>
                    <button>아이디/비밀번호 찾기 →</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage