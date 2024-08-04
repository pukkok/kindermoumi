import React from "react";
import AllergyTable from "./AllergyTable";

function AllergyEditor ({ defaultAllergies, allergyList, setAllergyList }) {
    return(
        <section className="allergy-edit">
            <div className="summary">
                <h2>알레르기 등록</h2>
                <p>알레르기 표를 등록합니다. 부족한 정보가 있다면 추가가 가능합니다.</p>
                <span>*기본 20개 알레르기는 삭제가 불가능 합니다. 순서는 변경 가능합니다.</span>
            </div>
            <div className="remote-btns">
                <p>타입</p><span></span>
                <button >저장</button>
                <button >초기화</button>
            </div>
            <AllergyTable defaultAllergies={defaultAllergies} allergyList={allergyList} setAllergyList={setAllergyList}/>
        </section>
    )
}

export default AllergyEditor