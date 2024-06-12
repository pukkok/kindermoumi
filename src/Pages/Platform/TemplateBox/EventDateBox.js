import React, { useState } from "react";
import './styles/EventDateBoxType.css'
import dayjs from 'dayjs'

const EventDateBox1 = ({ eventContents=[] }) => {
    const defaultDay = dayjs().locale('ko')
    const [standardDay, setStandardDay] = useState(defaultDay)
    const YM = standardDay.format('YYYY-MM')
    const month = standardDay.format('M')

    const moveMonth = (move) => {
        if(move==='prev'){
            const prevMonth = standardDay.set('M', month-2)
            setStandardDay(prevMonth)
        }else{
            const nextMonth = standardDay.set('M', +month)
            setStandardDay(nextMonth)
        }
    }

    const sampleData = {
        eventContents: [
            {span: 3, p: 'Event1'},
            {span: 4, p: 'Event2'},
            {span: 8, p: 'Event3'},
            {span: 16, p: 'Event4'},
            {span: 16, p: 'Event6'},
            {span: 16, p: 'Event8'},
        ]
    }


    return(
        <section className="ed-box-type">
            <div className="type1">
                <h1>행사 일정 <span><img src={`${origin}/platform/0007_btn_more03.png`}/></span></h1>
                <div className="cal">
                    <div className="head">
                        <button onClick={()=>moveMonth('prev')}><span className="material-symbols-outlined">chevron_left</span></button>
                        <p className="date">{YM}</p>
                        <button onClick={()=>moveMonth('next')}><span className="material-symbols-outlined">chevron_right</span></button>
                    </div>
                    <div className="event">
                        {eventContents.length>0 ? eventContents.map((item, idx) => {
                            return <p key={idx}><span>{item.span}</span>{item.p}</p>
                        }):
                        sampleData.eventContents.map((item, idx) => {
                            return <p key={idx}><span>{item.span}</span>{item.p}</p>
                        })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

const EventDateBox2 = ({ eventContents=[] }) => {
    return(
        <section className="ed-box-type small">
            <div className="type2">
                <div className="title">
                    <h1>월간 일정표</h1>
                    <img src={`${origin}/platform/sch_bg.png`}/>
                </div>
                <div className="event">
                    {eventContents.length>0 && eventContents.map((item, idx)=>{
                        return <p key={idx}><span>{item.span}</span>{item.p}</p>
                    })}
                </div>
            </div>
        </section>
    )
}

export { EventDateBox1, EventDateBox2 }