import React from "react";

function Container ({width=1280, perWidth, children}) {
    const containerStyle = {
        // maxWidth: width+'px',
        width: perWidth ? perWidth+'%' : width+'px',
        margin: '0 auto',
        height: '100%'
    }

    return(
        <div className="container" style={containerStyle}>
            {children}
        </div>
    )
}

export default Container