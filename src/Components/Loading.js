import React from "react";
import './styles/Loading.css'
function Loading(){

    return(
        <>
            <div id="mirror">Loading ...</div>

            <div className={`loading mirror`}>
                <div className="squareXS"></div>
                <div className="squareXL"></div>
            </div>
        </>
    )

}
export default Loading