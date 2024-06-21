import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { MenusAtom, deleteYOILAtom, sideOptionsAtom } from "../../../../Recoil/AdminAtom";
import readXlsxFile from "read-excel-file";


function MenuEditor ({ token }) {

    const weeks = ['월', '화', '수', '목', '금', '토', '일']
    const yoilRef = useRef({})

    const [deleteYOIL, setDeleteYOIL]  = useRecoilState(deleteYOILAtom)
    const [sideOptions, setSideOptions] = useRecoilState(sideOptionsAtom)
    // 요일 지우기
    const checkYoilValue = () => {
        let deleteYoils = []

        weeks.forEach((yoil) => {
            if(yoilRef.current[yoil].checked){
                deleteYoils.push(yoil)
            }
        })

        setDeleteYOIL(deleteYoils)
    }

    const saveYoilValue = async () => {
        const { data } = await axios.post('platform/menu/yoil', {
            deleteYOIL : [...deleteYOIL]
        },{headers : {'Authorization' : `Bearer ${token}`}})
        alert(data.msg)
    }

    const resetYoilValue = () => {
        setDeleteYOIL([])
    }

    const [imsiOptions, setImsiOptions] = useState([
        {num:0, optionName: ''}
    ])


    useEffect(()=>{
        if(deleteYOIL.length>0){
            deleteYOIL.forEach(yoil=>{
                yoilRef.current[yoil].checked = true
            })
        }

        if(sideOptions.length>0){
            const loadOptions = sideOptions.map((option, idx) => {
                return {num: idx, optionName: option}
            })
            setImsiOptions([...loadOptions])
        }
    },[deleteYOIL, sideOptions])

    // 추가
    const addSideOptions = () => {
        setImsiOptions([...imsiOptions, {num : imsiOptions.length, optionName:''}])
    }

    // 삭제
    const deleteSideOption = (e, num) => {
        const sorting = imsiOptions.map((option, idx) => {
            if(option.num > num){
                option.num = option.num - 1
            }
            if(num === idx){
                option.num = imsiOptions.length-1
            }
            return option
        })
        const filtering = sorting.filter(option => {
            return sorting.length-1 !== option.num
        })
        
        setImsiOptions(filtering)
    }

    // 입력
    const sideInputValue = (e, num) => {
        const mapping = imsiOptions.map(option => {
            if(option.num === num){
                return {num, optionName: e.target.value}
            }else{
                return option
            }
        })
        setImsiOptions(mapping)
    }

    //보내기
    const sendSideOptions = () => {
        if(imsiOptions.length === 1 && imsiOptions[0].optionName === ''){
            return setSideOptions([])
        }
        setSideOptions(
            imsiOptions.map(option => {
            return option.optionName
        }))
    }

    const saveSideOptions = async () => {
        const { data } = await axios.post('platform/menu/side-options', {
            sideOptions : [...sideOptions]
        },{headers : {'Authorization' : `Bearer ${token}`}})
        alert(data.msg)
        
    }

    const saveMenuData = async () => {
        if(readData.length>0){
            const { data } = await axios.post('platform/menu/table', {
                menus : readData
            },
            {headers : {'Authorization' : `Bearer ${token}`}
            })
            console.log(data)
        }
    }

    const [uploadFile, setUploadFile] = useState()
    const uploadRef = useRef(null)
    const uploadChange = () => {
        setUploadFile(uploadRef.current.files[0])
    }
    const [readData, setReadData] = useRecoilState(MenusAtom)
    const readExcel = () => {
        const headers = [ 'date', 'idx', 'title', 'allergyNums']
        readXlsxFile(uploadRef.current.files[0])
        .then(rows=> {
            return [...rows].map(datas => { // 순번 제거
                return datas.filter((_, i) => {
                    return i !== 0
                })
            })
        })
        .then(rows => [...rows].filter((_, i) => {
            return i !== 0 // 헤더 제거
        }))
        .then(filterRows => { // 전부 공백인 값 제거
            return filterRows.filter(datas => {
                return !datas.every(data=> {
                    return data === null
                })
            })
        })
        .then(rows => [...rows].map(datas => {
            const buildObj = datas.map((data, i) => {
                return { [headers[i]] : data }
            })
            const changeObj = buildObj.reduce((acc, r)=>{
                return acc = {...acc, ...r}
            },{})
            return {...changeObj}
        }))
        .then(result => setReadData([...result]))
        .catch(err => {
            alert('잘못된 양식입니다. 다시 한번 확인해주세요!')
            console.log(err)
        })
    }

    return(
        <section className="menu-edit">
            <div className="summary mb">
                <h2>식단표 등록</h2>
                <p>월간 식단표를 입력합니다. 필요한 요일을 삭제 할 수도, 사이드 옵션을 추가하여 관리할 수 있습니다.</p>
                <span>* 특별한 식단표를 만들어 보세요.</span><br/>
            </div>
            
            <div className="summary">
                <h2>요일 제외하기</h2>
                <p>사용하지 않는 요일을 삭제할 수 있습니다.</p>
                <span>* 주말을 제외하고 싶은 경우 "토", "일" 선택</span><br/>
                <span>* 적용 클릭 후 저장을 눌러야 제외하는 날짜가 저장됩니다.</span><br/>
            </div>
            <div className="remote-btns">
                <p>설정</p><span></span>
                <button onClick={checkYoilValue}>적용</button>
                <button onClick={saveYoilValue}>저장</button>
                <button onClick={resetYoilValue}>초기화</button>
            </div>
            <div className="upload mb">
                <div className="option-box">
                    <p>삭제할 요일 선택</p>
                    {weeks.map((yoil, idx) => {
                        return(
                            <label key={idx}>
                                <input type="checkbox" ref={el => yoilRef.current[yoil] = el}/>{yoil}
                            </label>
                        )
                    })}
                </div>
            </div>
            
            <div className="summary">
                <h2>사이드 메뉴 추가하기</h2>
                <p>식단표를 구분 할 사이드메뉴를 추가 할 수 있습니다.</p>
                <span>필요한 경우만 추가하여 사용하면 됩니다. (필수 x)</span><br/>
                <span>* 적용 클릭 후 저장을 눌러야 사이드 메뉴가 저장됩니다.</span><br/>
                <span>* 오늘의 한상, kcal/단백질(g), 간식</span><br/>
            </div>
            <div className="remote-btns">
                <p>옵션 설정</p><span></span>
                <button onClick={addSideOptions}>추가</button>
                <button onClick={sendSideOptions}>적용</button>
                <button onClick={saveSideOptions}>저장</button>
                <button >초기화</button>
            </div>
            <div className="upload mb">
                <div className="option-box">
                    <p>사이드 메뉴 등록</p>
                    {imsiOptions.map((option, idx)=> {
                        return <div key={idx} className="side-menu-box">
                            {idx+1} : <input onChange={(e)=>sideInputValue(e, idx)} value={option.optionName}/>
                            {idx !== 0 && <button onClick={(e)=>deleteSideOption(e, idx)}>삭제</button>}
                        </div>
                    })}
                </div>
            </div>

            
            <div className="summary">
                <h2>정보 입력하기</h2>
                <p>입력하고 싶은 칸을 클릭해보세요.</p>
                <span>* 클릭하여 정보를 입력할 수 있습니다.</span><br/>
            </div>
            <div className="remote-btns">
                <p>엑셀 양식</p><span></span>
                <button>
                    <a href={`${origin}/식단표 양식.xlsx`} download={'월간 식단표.xlsx'}>다운로드</a>
                </button>
                <button onClick={()=>uploadRef.current.click()}>업로드</button>
                <button onClick={readExcel}>적용</button>
                <button onClick={saveMenuData}>저장</button>
            </div>
            <div className="upload">
                <div className="option-box">
                <p>파일명 : {uploadFile && uploadFile.name}</p>
                </div>
            </div>
            <input type="file" hidden onChange={uploadChange} ref={uploadRef} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
        </section>
    )
}

export default MenuEditor