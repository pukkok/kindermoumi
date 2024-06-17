import React from "react";
import { useRecoilState } from "recoil";
import { HeaderAtom } from '../../../../Recoil/AdminAtom'

const verticalTypes = ['align_center', 'align_start', 'align_end', 'align_space_around', 'align_space_between', 'align_stretch']
const horizonTypes = ['align_justify_center', 'align_justify_flex_start', 'align_justify_flex_end', 'align_justify_space_between', 'align_justify_space_even', 'align_justify_space_around']

function HeaderEditor () {
    const [headerHeight, setHeaderHeight] = useRecoilState(HeaderAtom)

    const headerHeightInput = (e) => {
        setHeaderHeight(e.target.value)
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
                    <p>수직 정렬</p>
                    {verticalTypes.map((type, idx) => {
                        return <span key={idx} className="material-symbols-outlined border-box">{type}</span>
                    })}
                </div>

                <div className="option-box">
                    <p>수평 정렬</p>
                    {horizonTypes.map((type, idx) => {
                        return <span key={idx} className="material-symbols-outlined border-box">{type}</span>
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