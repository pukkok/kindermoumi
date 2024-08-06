import React, { useEffect, useState } from "react";
import DateModal from "./DateModal";
import Calendar from "../../Custom/Calendar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { MenusAtom, dayColorOptionsAtom, deleteYOILAtom, selectMonthAtom, sideOptionsAtom } from "../../Recoil/AdminAtom";

function MenuTable ({ allergyList }) {
    
    const deleteYOIL = useRecoilValue(deleteYOILAtom)
    const sideOptions = useRecoilValue(sideOptionsAtom)

    const [menu, setMenu] = useRecoilState(MenusAtom) // [{title:'' date: ''}]
    const [sendData, setSendData] = useState({})

    const [openModal, setOpenModal] = useState(false)
    const [modalPosition, setModalPosition] = useState({left:800, top:200})

    const [selectDateInfo, setSelectDateInfoInfo] = useState({})

    useEffect(()=>{
        if(Object.values(sendData).length>0){
            setMenu([...menu, sendData])
        }
    },[sendData])

    const openDay = (info) => {
        const date = info.day.format('YYYY-MM-DD')
        const idx = info.idx
        setSelectDateInfoInfo({date, idx})
        setOpenModal(true) // 모달창 열기
    }

    const setSelectMonth = useSetRecoilState(selectMonthAtom)
    const dayColorOptions = useRecoilValue(dayColorOptionsAtom)

    return(
        <section className="menu-table">
            <Calendar wantDeleteYOIL={deleteYOIL} menuInfo={menu} getDay={setSelectMonth}
             sideOptions={sideOptions} dayClick={openDay}
             isBold={dayColorOptions.isBold} dayColor={dayColorOptions.color} dayBackColor={dayColorOptions.background}
             footerTitle={'알레르기 정보'} footerList={allergyList}
             />
             
            <DateModal dateInfo={selectDateInfo} isOpen={openModal}
             handleClick={()=>setOpenModal(false)} setSendData={setSendData}
             modalPosition={modalPosition}
             />
        </section>
    )
}

export default MenuTable