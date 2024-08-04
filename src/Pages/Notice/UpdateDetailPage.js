import React from "react";
import { Link, useParams } from "react-router-dom";
import { updateContents } from "../../Datas/UpdateData";

function UpdateDetailPage ({updateDatas}) {
    const {updateNum} = useParams()
    const {title, date} = updateDatas[updateNum-1]

    const splitContents = updateContents[updateNum-1].split('\n')
    console.log(splitContents)
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
                        {content &&<p>{content}</p>}<br/>
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