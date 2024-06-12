import React from "react";
import ImgBox from "../../Components/ImgBox";

function ServiceIntroduce () {

    const printPage = () => {
        window.print()
    }

    return(
        <>
            <div className="title">
                <h2>공시항목 소개
                <ImgBox src={`${origin}/btn-icon-print.png`} alt="print" addClass={'print'} handleClick={printPage}/>
                </h2>
                <h5>
                <ImgBox src={`${origin}/icon-breadcrumb-home.png`} alt="홈"/>
                <span className="material-symbols-outlined">arrow_forward_ios</span>
                <span>유치원 모으미란</span>
                <span className="material-symbols-outlined">arrow_forward_ios</span>
                <span>공시항목 소개</span>
                </h5>
            </div>
            <h4>공시 항목</h4>
            <div className="info-box">
            <div className="text-box">
                <h4>언제, 어떤 정보들이 공시되고 있나요?</h4>
                <h5>2012년 9월부터 유치원정보공시제도 포털사이트(유치원알리미)가 개통되어 7개 항목, 23개(수시 3종, 정시 20종) 범위에서 매년 1회 이상 유치원의 주요 정보들이 공시되고 있습니다.</h5>
                <h5>유치원에서는 공시 기준에 따라 유아 · 교직원 현황, 유치원 회계 현황, 환경위생 및 안전관리 사항 등 유치원의 주요 정보를 공시하고 있습니다.</h5>
            </div>
            <div className="info-table">
                <table className="introduce">
                    <colgroup>
                        <col style={{width:'32%'}}/>
                        <col style={{width:'36%'}}/>
                        <col style={{width:'8%'}}/>
                        <col style={{width:'12%'}}/>
                        <col style={{width:'12%'}}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>공시정보 항목</th>
                            <th>공시정보 범위</th>
                            <th>공시기관</th>
                            <th>공시횟수</th>
                            <th>공시시기</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th rowSpan={5}>유치원 규칙·시설 등 기본현황</th>
                            <td colSpan={4}>가. 일반 현황</td>
                        </tr>
                        <tr>
                            <td className="inner">1) 기관 기본현황</td>
                            <td>전체</td>
                            <td>연 1회</td>
                            <td>4월</td>
                        </tr>
                        <tr>
                            <td className="inner">2) 유치원 규칙</td>
                            <td>전체</td>
                            <td>수시</td>
                            <td>수시</td>
                        </tr>
                        <tr>
                            <td className="inner">3) 원장명, 설립·경영자명</td>
                            <td>전체</td>
                            <td>연 2회</td>
                            <td>4월, 10월</td>
                        </tr>
                        <tr>
                            <td>나. 교지(校地)·교사(校舍) 등 시설 현황</td>
                            <td>전체</td>
                            <td>연 1회</td>
                            <td>4월</td>
                        </tr>
                        <tr>
                            <th rowSpan={4}>유아 및 유치원 교원 등에 관한 사항</th>
                            <td>가. 연령별 학급수·유아수</td>
                            <td>전체</td>
                            <td>연 2회</td>
                            <td>4월, 10월</td>
                        </tr>
                        <tr>
                            <td colSpan={4}>나. 교직원 현황</td>
                        </tr>
                        <tr>
                            <td className="inner">1) 직위ㆍ자격별 교원현황</td>
                            <td>전체</td>
                            <td>연 2회</td>
                            <td>4월, 10월</td>
                        </tr>
                        <tr>
                            <td className="inner">2) 교사의 현 기관 근속연수</td>
                            <td>전체</td>
                            <td>연 2회</td>
                            <td>4월, 10월</td>
                        </tr>
                        <tr>
                            <th rowSpan={3}>
                            유치원 교육과정 및 방과후 과정 <br/>
                            편성·운영에 관한 사항
                            </th>
                            <td>가. 교육과정 편성·운영에 관한 사항</td>
                            <td>전체</td>
                            <td>연 1회</td>
                            <td>4월</td>
                        </tr>
                        <tr>
                            <td>나. 방과후 과정 편성·운영에 관한 사항</td>
                            <td>전체</td>
                            <td>연 1회</td>
                            <td>4월</td>
                        </tr>
                        <tr>
                            <td>다. 수업일수 현황</td>
                            <td>전체</td>
                            <td>연 1회</td>
                            <td>4월</td>
                        </tr>
                        <tr>
                            <th rowSpan={5}>
                            유치원 원비 및 예·결산 등 <br/>
                            회계에 관한 사항
                            </th>
                            <td colSpan={4}>가. 유치원 원비 현황</td>
                        </tr>
                        <tr>
                            <td className="inner">1) 교육과정비, 방과후 과정 운영비</td>
                            <td>전체</td>
                            <td>연 2회</td>
                            <td>4월, 10월</td>
                        </tr>
                        <tr>
                            <td className="inner">2) 특성화 활동비</td>
                            <td>전체</td>
                            <td>연 2회</td>
                            <td>4월, 10월</td>
                        </tr>
                        <tr>
                            <td>나. 유치원 회계 예·결산서</td>
                            <td>전체</td>
                            <td>각 연 1회</td>
                            <td>(예산)4월 <br/> (결산)10월</td>
                        </tr>
                        <tr>
                            <td>다. 적립금 현황</td>
                            <td>사립</td>
                            <td>연1회</td>
                            <td>(결산)10월</td>
                        </tr>
                        <tr>
                            <th rowSpan={7}>
                            유치원의 급식·보건관리 <br/>
                            ·환경위생 및 안전관리에 관한 사항
                            </th>
                            <td colSpan={4}>가. 급식관리 현황</td>
                        </tr>
                        <tr>
                            <td className="inner">1) 급식실시 및 급식사고 발생·처리 현황</td>
                            <td>전체</td>
                            <td>연 2회</td>
                            <td>4월, 10월</td>
                        </tr>
                        <tr>
                            <td className="inner">2) 식단표</td>
                            <td>전체</td>
                            <td>수시</td>
                            <td>수시</td>
                        </tr>
                        <tr>
                            <td>나. 환경위생관리 현황</td>
                            <td>전체</td>
                            <td>연 2회</td>
                            <td>4월, 10월</td>
                        </tr>
                        <tr>
                            <td>다. 안전점검 현황</td>
                            <td>전체</td>
                            <td>연 2회</td>
                            <td>4월, 10월</td>
                        </tr>
                        <tr>
                            <td>라. 안전교육 계획 및 실시 현황</td>
                            <td>전체</td>
                            <td>연 1회</td>
                            <td>4월</td>
                        </tr>
                        <tr>
                            <td>마. 공제회 및 보험가입 현황</td>
                            <td>전체</td>
                            <td>연 2회</td>
                            <td>4월, 10월</td>
                        </tr>
                        <tr>
                            <th>
                            유아교육법 제30조부터<br/>
                            제32조까지의 시정명령 등에 관한 사항
                            </th>
                            <td>위반내용 및 조치 결과</td>
                            <td>전체</td>
                            <td>수시</td>
                            <td>수시</td>
                        </tr>
                        <tr>
                            <th rowSpan={2}>
                            그 밖에 교육여건 및 유치원 <br/>
                            운영상태 등에 관한 사항
                            </th>
                            <td>가. 통학차량 운영 현황</td>
                            <td>전체</td>
                            <td>연 2회</td>
                            <td>4월, 10월</td>
                        </tr>
                        <tr>
                            <td>나. 유치원 평가에 관한 사항</td>
                            <td>전체</td>
                            <td>연 1회</td>
                            <td>4월</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </>
    )

}

export default ServiceIntroduce