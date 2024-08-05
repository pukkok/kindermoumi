import React from "react";
import { Link, useParams } from "react-router-dom";
import { updateContents } from "../../Datas/UpdateData";
import classNames from "classnames";

function UpdateDetailPage ({updateDatas}) {
    const {updateNum} = useParams()
    const {title, date} = updateDatas[updateNum-1]
    const splitContents = updateContents[updateNum-1] && updateContents[updateNum-1].split('\n')

    function spaceChecker(text) {
        // 줄 단위로 분할
        const checkCnt = text.match(/✓/g)
        if(!checkCnt) return '10px'
        switch(checkCnt.length){
            case 1 : return '40px'
            case 2 : return '80px'
            case 3 : return '120px'
            case 4 : return '160px'
            case 5 : return '200px'
        }
    }

    return(
        <>
            <div className="head">
                <h1>{title}</h1>
                <p>{date}</p>
            </div>
            <div className="contents">
                {splitContents.length>0 && 
                splitContents.map((content, idx) => {
                    return <React.Fragment key={idx}>
                        {content.includes('©') ? 
                        <p style={{paddingLeft : spaceChecker(content)}} className={classNames("code")}>{content.replace(/©/g, '').replace(/✓/g, '')}</p>: 
                        <><p>{content}</p><br/></>}
                        </React.Fragment>
                })}
            </div>
            <div className="footer">
                <Link to={'/notice/update'}>← 목록으로</Link>
            </div>
        </>
    )
}

export default UpdateDetailPage