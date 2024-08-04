import React from "react";
import Container from "../../Components/Container";
import {Link, useHref} from "react-router-dom";

function UpdateInfo ({updateDatas}) {

    const href = useHref()

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
                    {updateDatas.length>0 && updateDatas.slice().reverse().map((data, idx) => {
                        const {title, date, auth, file} = data
                        return <tr key={idx}>
                            <td>{updateDatas.length - idx}</td>
                            <td><Link to={`${href}/${updateDatas.length - idx}`}>{title}</Link></td>
                            <td>{date}</td>
                            <td>{auth}</td>
                            <td>{file}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </Container>
        </section>
    )
}

export default UpdateInfo