import React from "react";
import ImgBox from "../../Components/ImgBox";
import HeadLine from "../Common/HeadLine";
import { MergeTable, TableBody } from 'react-merge-table' 

function ServiceInfo ({depth1, depth2}) {

    const rows = [
        ['수시(3)', 
            ['식단표(선택)', '위반내용 및 조치 결과', '유치원 규칙'], 
            "~"
        ],
        ['4월 정시 (19)', 
            ['기관 기본현황', '원장명, 설립·경영자명', '교지·교사 등 시설현황', '연령별 학급 수·유아 수'], 
            ['직위·자격별 교직원현황', '교사의 현 기관 근속연수', '교육과정 편성·운영에 관한 사항', '방과후 과정 편성·운영에 관한 사항', '수업일수 현황']
        ],
        [
            '$',
            ['교육과정비, 방과후 과정 운영비', '특성화 활동비', '유치원 회계 예산서', '급식실시 및 급식사고 발생·처리 현황', '환경위생관리 현황'],
            ['안전점검 현황', '안전교육 계획 및 실시 현황', '공제회 및 보험가입 현황', '통학차량 운영 현황', '유치원 평가에 관한 사항']
        ],
        ['10월 정시(13)',
            ['원장명, 설립·경영자명', '연령별 학급수·유아수', '직위·자격별 교원현황', '교사의 현 기관 근속연수', '교육과정비, 방과후 과정 운영비', '특성화 활동비'],
            ['유치원 회계 결산서', '적립금 현황', '급식실시 및 급식사고 발생· 처리 현황', '환경위생관리 현황', '안전점검 현황', '공제회 및 보험가입 현황', '통학차량 운영 현황']
        ]
    ]

    return(
        <>
        <HeadLine depth1={depth1} depth2={depth2}/>
        <h4>공시 개요</h4>
        <div className="info-box">
            <div className="info">
                <ImgBox src={`${origin}/icon-summary-thumb.png`} alt="공시 개요"/>
                <div className="text-box">
                    <h4>유치원 전반의 주요 정보를 객관적이고 투명하게 공개하는 제도로, 학부모의 알권리를 보장하고 유치원의 실태를 정확하게 파악하여 유아 교육의 질을 높이기 위한 제도입니다.</h4>
                    <h5>유치원 학부모의 선택권 강화 : 유치원별 다양한 장점 등의 정보를 제공하여 학부모의 선택권을 강화하며 유치원 관련 국가통계 확보함에 있습니다.</h5>
                    <h5>유치원 운영의 투명성 제고 : 국민의 알 권리 보장 및 유치원 교육정보에 대한 학부모의 요구가 증가되는 시점에서 유치원 운영의 투명성을 제고합니다.</h5>
                </div>
            </div>
        </div>
        <h4>대상 유치원</h4>
        <div className="info-box">
            <div className="text-box">
                <h4>유아교육법 제2조 및 제7조에 따른 아래에 해당하는 전국 유치원을 대상으로 하고 있습니다.</h4>
                <h5>국립유치원,공립유치원,사립유치원</h5>
            </div>
        </div>
        <h4>정보공시항목</h4>
        <div className="info-box">
            <div className="text-box">
                <h4>언제, 어떤 정보들이 공시되고 있나요?</h4>
                <h5>2012년 9월부터 유치원정보공시제도 포털사이트(유치원알리미)가 개통되어 7개 항목, 23개(수시 3종, 정시 20종) 범위에서 매년 1회 이상 유치원의 주요 정보들이 공시되고 있습니다.</h5>
                <h5>유치원에서는 공시 기준에 따라 유아 · 교직원 현황, 유치원 회계 현황, 환경위생 및 안전관리 사항 등 유치원의 주요 정보를 공시하고 있습니다.</h5>
            </div>

            <div className="info-table">
                <MergeTable>
                    <colgroup>
                        <col style={{width:'20%'}}/>
                        <col style={{width:'40%'}}/>
                        <col style={{width:'40%'}}/>
                    </colgroup>
                    <TableBody 
                        defaultStyle={false}
                        rows={rows}
                        columnRenderers={{
                            0: cell => <th>{cell.content.label}</th>,
                            1: (cell) => (
                                <ul>
                                    {cell.contents.map((v) => <li key={v.key}>{v.label}</li>)}
                                </ul>
                            ),
                            2: cell => (
                                <ul>
                                    {cell.contents.map((v) => <li key={v.key}> {v.label}</li>)}
                                </ul>
                            ) 
                        }}
                    />
                </MergeTable>
            </div>
        </div>
        </>
    )
}

export default ServiceInfo