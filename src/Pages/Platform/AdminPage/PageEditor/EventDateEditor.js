import React from "react";
import {EventDateBox1, EventDateBox2} from "../../TemplateBox/EventDateBox";
import ImgBox from "../../../../Components/ImgBox";

function EventDateEditor ({contentType, setContentType}) {
    
    const smapleData2 = {
        eventContents: [
            {span: '06/08', p: 'Event1'},
            {span: '06/13', p: 'Event2'},
            {span: '06/15', p: 'Event3'},
            {span: '06/16', p: 'Event4'},
            {span: '06/16', p: 'Event6'},
            {span: '06/16', p: 'Event8'},
        ]
    }

    const sendEventDateType = (e, idx) => {
        setContentType({...contentType, ['eventDate']: idx})
    }

    return(
        <section className="eventdate-edit" id="EventDate">
            <div className="summary">
                <h2>행사 일정</h2>
                <p>달력 형식으로 일정을 추가하는 컨텐츠 입니다.</p>
                <span>*행사 일정 탭에서 일정을 추가 할 수있습니다.</span>
            </div>
            <div className="remote-btns">
                <p>타입</p><span></span>
                <button >저장</button>
                <button >초기화</button>
            </div>
            <div className="select-type mb">
                <div className="type-box">
                    <h1>타입1 <button onClick={(e)=>sendEventDateType(e, 1)}>선택</button></h1>
                    <ImgBox src={`${origin}/platform/event-date-type1.png`}/>
                </div>
                <div className="type-box">
                    <h1>타입2 <button onClick={(e)=>sendEventDateType(e, 2)}>선택</button></h1>
                    <EventDateBox2 eventContents={smapleData2.eventContents}/>
                </div>
            </div>
        </section>
    )
}

export default EventDateEditor