import React from "react";

function NotFoundPage () {

    const notFoundStyle = {
        width: '100%',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return(
        <section className="not-found" style={notFoundStyle}>
            <h1 style={{ fontSize: '30px'}}>
                존재하지 않는 페이지 입니다.</h1>
        </section>
    )
}
export default NotFoundPage