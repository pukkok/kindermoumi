import React, { forwardRef } from "react";

const ImgBox = forwardRef(({src='', alt='', addClass, handleClick, imgSize}, ref) => {


    const imgBoxSize = {
        width : imgSize && imgSize.width + 'px',
        height : imgSize && imgSize.height + 'px'
    }

    return(
        <div className={addClass ? addClass : "img-box"} ref={ref} style={imgSize && imgBoxSize}>
            <img src={src} alt={alt} onClick={handleClick} />
        </div>
    )
})

export default ImgBox