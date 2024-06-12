import React, { useEffect, useRef, useState } from "react";
import './styles/InputInfo.css'
import classNames from "classnames";
import axios from "axios";


const phoneOptions = ['선택', '010', '011', '016', '017', '018', '019']
const emailOptions = ['선택', 'naver.com', 'nate.com', 'gmail.com', 'daum.net']
const BASE_URL = 'http://localhost:5000'

function InputInfo ({type, info, setFunc, inputValues}) {

    useEffect(()=>{ // 인증서 통과시
        if(info){
            setFunc({...inputValues, ...info})
        }
    },[info])

    const [activeOption, setActiveOption] = useState({ phoneOption: '선택', emailOption: '선택'})
    const [openList, setOpenList] = useState({ phoneOption : false, emailOption : false})

    const selectOption = (e, option) => { // ul list 열기
        setOpenList({...openList, [option] : !openList[option]})
        setActiveOption({...activeOption, [option] : e.target.innerText})    
    }

    const [selectNum, setSelectNum] = useState({ phoneOption: 0, emailOption : 0}) // li index번호
    const selectPhoneRef = useRef([]) // 폰번호 선택 리스트
    const selectEmailRef = useRef([]) // 이메일 선택 리스트
    const selectOptionKeyBoard = (e, option) => {
        if(e.code === 'ArrowDown'){
            if(!openList[option]){
                setOpenList({...openList, [option] : true})
                if(!selectNum[option]){
                    setSelectNum({...selectNum, [option] : 0})
                }
            }else{
                if(selectNum[option] < e.target.children.length-1){
                    setSelectNum({...selectNum, [option] : selectNum[option]+1})
                }else{
                    setSelectNum({...selectNum, [option] : 0})
                }
            }
        }
        
        if(e.code === 'ArrowUp'){
            if(openList[option]){
                if(selectNum[option] < 1){
                    setSelectNum({...selectNum, [option] : e.target.children.length-1})
                }else{
                    setSelectNum({...selectNum, [option] : selectNum[option]-1})
                }
            }
        }
        
        if(e.code === 'Enter'){
            if(openList[option]){
                setOpenList({...openList, [option] : false})
            }
        }
    }

    useEffect(()=>{
        setActiveOption({
            ...activeOption, 
            phoneOption : selectPhoneRef.current[selectNum['phoneOption']].innerText,
            emailOption : selectEmailRef.current[selectNum['emailOption']].innerText
        })
        
    },[selectNum])

    useEffect(()=>{ // 셀렉트 박스 바뀔때

        const phoneHead = selectPhoneRef.current.filter(li => {
            return li.classList.contains('active') 
        })[0].innerText

        if(phoneHead !== '선택'){
            const extra = phoneRef.current.map(input => input.value)
            const phone = phoneHead + '-' + extra.join('-')
            setFunc({...inputValues, phone})
        }

        const emailHead = selectEmailRef.current.filter(li => {
            return li.classList.contains('active')
        })[0].innerText

        if(emailHead !== '선택'){
            emailRef.current[1].value = emailHead
            const email = emailRef.current.map(input => input.value).join('@')
            setFunc({...inputValues, email})
        }
        
    },[activeOption])

    const phoneRef = useRef([])
    const emailRef = useRef([])

    const inputInfo = (e) => { // 교사 데이터를 불러왔다면 소속기관, 이름 입력
        if(e.target.name.includes('phone')){
            const head = selectPhoneRef.current.filter(li => {
                return li.classList.contains('active') 
            })[0].innerText
            if(head !== '선택'){
                const extra = phoneRef.current.map(input => input.value)
                let phone = head + '-' + extra.join('-')
                return setFunc({...inputValues, phone})

            }
        }

        if(e.target.name.includes('email')){
            const email = emailRef.current.map(input => input.value).join('@')
            return setFunc({...inputValues, email})
        }

        if(e.target.name)

        if(!info[e.target.name]){ // 불러온 교사 데이터가 있다면 수정 불가
            setFunc({...inputValues, [e.target.name]: e.target.value })
        }else{
            alert('잘못된 접근입니다.')
        }
    }

    // id 중복확인
    async function duplicateCheck (e) {
        e.preventDefault()
        const userId = inputValues.userId
        let url = ''
        if(type === '교직원') url = `${BASE_URL}/teacher/join/id-check`
        const { data } = await axios.post(url, {
            userId
        })
        alert(data.msg)    
    }

    return(
        <section className="input-info">
            <div className="text-box dashed">
                <h2>회원정보 작성</h2>
                <h4>가입하신 정보는 회원님의 동의없이 공개되지 않으며, 개인정보보호정책에 의해 보호를 받습니다.</h4>
            </div>
            <div className="join-table">
                <table>
                    <colgroup>
                        <col style={{width : '15%'}}></col>
                        <col style={{width : '37.5%'}}></col>
                        <col style={{width : '15%'}}></col>
                        <col style={{width : '27.5%'}}></col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th><span className="essential">*</span>소속기관</th>
                            <td colSpan={3}>
                                <div>
                                    <input name="organization" placeholder={'유치원 명'} onChange={inputInfo} value={inputValues.organization}/>
                                    <p>{info.isDirector ? '(원장)' : ''}</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th><span className="essential">*</span>이름</th>
                            <td colSpan={3}>
                                <div>
                                    <input onChange={inputInfo} name="name" value={inputValues.name}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th><span className="essential">*</span>아이디</th>
                            <td colSpan={3}>
                                <div>
                                    <form>
                                        <input type="text" onChange={inputInfo} name="userId" value={inputValues.userId} />
                                        <button onClick={duplicateCheck} tabIndex={-1}>중복 확인</button>
                                    </form>
                                    <span>아이디는 영문, 숫자의 조합으로 입력해주세요.</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th><span className="essential">*</span>비밀번호</th>
                            <td>
                                <div>
                                    <input type="password" onChange={inputInfo} name="password" value={inputValues.password}/>
                                    <span>비밀번호는 문자,숫자,특수문자의 조합으로 9~16자리로 입력해주세요.</span>
                                </div>
                            </td>
                            <th><span className="essential">*</span>비밀번호 확인</th>
                            <td>
                                <div>
                                    <input type="password" onChange={inputInfo} name="confirmPassword" value={inputValues.confirmPassword}/>
                                    <span>비밀번호와 동일하게 입력해주세요.</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>휴대폰 번호</th>
                            <td colSpan={3}>
                                <div>
                                    <ul className={classNames("table-list", {on : openList.phoneOption})} tabIndex={0} onClick={(e)=>selectOption(e, 'phoneOption')} onKeyDown={(e)=>selectOptionKeyBoard(e, 'phoneOption')}>
                                    {phoneOptions.map((option, idx)=>{
                                        return <li key={option+idx} 
                                        ref={el => !selectPhoneRef.current.includes(el) && el !==null && selectPhoneRef.current.push(el) } 
                                        className={classNames({active : activeOption.phoneOption===option})}>{option}</li>
                                    })}
                                    </ul>
                                    <p>-</p>
                                    <input onChange={inputInfo} name="phone-body" ref={el=> phoneRef.current[0] = el}/>
                                    <p>-</p>
                                    <input onChange={inputInfo} name="phone-tail" ref={el=> phoneRef.current[1] = el}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td colSpan={3}>
                                <div>
                                    <input ref={el => emailRef.current[0] = el} onChange={inputInfo} name="email-nick"/>
                                    <p>@</p>
                                    <input onChange={inputInfo} ref={el => emailRef.current[1] = el} name="email-address"/>
                                    <ul className={classNames("table-list", {on : openList.emailOption})} tabIndex={0} onClick={(e)=>selectOption(e, 'emailOption')} onKeyDown={(e)=>selectOptionKeyBoard(e, 'emailOption')}>
                                        {emailOptions.map((option, idx)=>{
                                            return <li key={option+idx} 
                                            ref={el => !selectEmailRef.current.includes(el) && el !==null && selectEmailRef.current.push(el) }
                                            className={classNames({active: activeOption.emailOption===option})}>{option}</li>
                                        })}
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {type === '학부모' && 
                <>
                    <div className="description">
                        <h2>사이트 부가정보</h2>
                        <p>회원가입시 필요한 부가정보입니다.<br/>
                        해당 학교에 재학중인 자녀가 있으신 경우에만 자녀 검색 후 추가해주시기 바랍니다.</p>
                    </div>
                    <div className="join-table">
                        <table>
                            <colgroup>
                                <col style={{width : '15%'}}></col>
                                <col style={{width : '37.5%'}}></col>
                                <col style={{width : '15%'}}></col>
                                <col style={{width : '27.5%'}}></col>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span className="essential">*</span>자녀명</th>
                                    <td colSpan={3}>
                                        <div>
                                            <input placeholder="예시) 김XX"/>
                                            <button>자녀 검색</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>}
            </div>
        </section>
    )
}

export default InputInfo