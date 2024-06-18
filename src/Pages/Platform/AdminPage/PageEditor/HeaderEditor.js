import React from "react";
import { useRecoilState } from "recoil";
import { HeaderAtom, HeaderFlexAtom } from '../../../../Recoil/AdminAtom'

const horizonTypes = [
    {name : 'align_justify_center', style: 'center'},
    {name : 'align_justify_flex_start', style: 'flex-start'},
    {name : 'align_justify_flex_end', style: 'flex-end'},
    {name : 'align_justify_space_between', style: 'space-between'},
    {name : 'align_justify_space_even', style: 'space-evenly'},
    {name : 'align_justify_space_around', style: 'space-around'},
]

function HeaderEditor () {
    const [headerHeight, setHeaderHeight] = useRecoilState(HeaderAtom)
    const [headerFlex, setHeaderFlex] = useRecoilState(HeaderFlexAtom)

    const headerHeightInput = (e) => {
        setHeaderHeight(e.target.value)
        
    }

    const flexStyler = (e) => {
        setHeaderFlex(e.target.dataset.style)
    }

    return (
        <section className="header-edit">
            <h2>상단 관리</h2>
            <div className="remote-btns">
                <p>업로드</p><span></span>
                <button title="수정된 이미지 옵션을 저장합니다." >저장</button>
                <button title="전체 옵션을 초기화합니다" >초기화</button>
            </div>
            <div className="upload mb">
                <div className="option-box">
                    <p>상단 설정</p>
                    <div className="inner">
                        <p>
                            <span>높이 :</span> 
                            <input onChange={headerHeightInput} name="height" placeholder={'60'} value={headerHeight}/>
                            px
                        </p>
                    </div>
                </div>

                <div className="option-box">
                    <p>로고 ↔ 네비게이션</p>
                    <div className="inner">
                        <p>
                            <span>간격 :</span>
                            <input />
                            px
                        </p>
                    </div>
                </div>

                <div className="option-box">
                    <p>수평 정렬</p>
                    {horizonTypes.map((type, idx) => {
                        return <span data-style={type.style} key={idx} className="material-symbols-outlined border-box" 
                        onClick={flexStyler}>{type.name}</span>
                    })}
                </div>

                <div className="option-box diff">
                    <label>
                        <input type="checkbox" className="checkbox"/>
                        컨테이너 추가
                    </label>
                    <p className="inner">
                        컨테이너 넓이 :
                    <input type="text"/>px
                    </p>
                </div>
            </div>
        </section>
    )
}
export default HeaderEditor