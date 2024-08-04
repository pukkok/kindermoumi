import React from "react";
import ImgBox from "../../Components/ImgBox";

function HeadLine ({depth1, depth2}) {

    const pagePrinter = () => {
        window.print()
    }

    return(
        <>
            <div className="title">
                <h2>{depth2}
                <ImgBox src={`${origin}/btn-icon-print.png`} alt="print" addClass={'print'} handleClick={pagePrinter}/>
                </h2>
                <h5>
                    <ImgBox src={`${origin}/icon-breadcrumb-home.png`} alt="홈"/>
                    <span className="material-symbols-outlined">arrow_forward_ios</span>
                    <span>{depth1}</span>
                    <span className="material-symbols-outlined">arrow_forward_ios</span>
                    <span>{depth2}</span>
                </h5>
            </div>
        </>
    )
}

export default HeadLine