import React, { useEffect, useState } from "react";
import Container from "../../Components/Container";
import {Link, useHref} from "react-router-dom";
import PageBtn from "../../Components/PageBtn";

function UpdateInfo ({updateDatas}) {

    const href = useHref()

    const [viewerDatas, setViewerDatas] = useState([])

    const [pagesCnt, setPagesCnt] = useState(1)

    useEffect(()=> {
        if(updateDatas.length>15){
            setViewerDatas(
                updateDatas.slice().reverse().filter((_, idx) => {
                    return (pagesCnt-1) * 15 < idx+1 && idx+1 <= pagesCnt * 15
                })
            )
        }else{
            setViewerDatas((prev) => prev = updateDatas.reverse())
        }
    },[pagesCnt, updateDatas])

    return(
        <section className="update-info">
        <Container>
            <table>
                <colgroup>
                    <col style={{width: '10%'}}/>
                    <col style={{width: '45%'}}/>
                    <col style={{width: '15%'}}/>
                    <col style={{width: '15%'}}/>
                    <col style={{width: '15%'}}/>
                </colgroup>
                <thead>
                    <tr>
                        <th>순번</th>
                        <th>제목</th>
                        <th>등록일</th>
                        <th>작성자</th>
                        <th>첨부파일</th>
                    </tr>
                </thead>
                <tbody>
                    {updateDatas.length>0 && viewerDatas.map((data, idx) => {
                        const {title, date, auth, file} = data
                        return <tr key={idx}>
                            <td>{updateDatas.length - idx - (pagesCnt-1) * 15}</td>
                            <td><Link to={`${href}/${updateDatas.length - idx - (pagesCnt-1) * 15}`}>{title}</Link></td>
                            <td>{date}</td>
                            <td>{auth}</td>
                            <td>{file}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            {updateDatas.length > 15 && 
            <PageBtn allLength={updateDatas.length} dividedValue={15} setFunc={setPagesCnt}/>
            }
        </Container>
        </section>
    )
}

export default UpdateInfo