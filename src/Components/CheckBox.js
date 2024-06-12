import React from "react";

function checkbox ({ addClass, inputRef, inputValue, handleClick, children, subOption }) {
    
    return(
        <label className={addClass ? addClass : 'label-input-box'}>
            <input ref={inputRef} type="checkbox" value={inputValue} onClick={handleClick} />
            <p>{children}{subOption && <span>{subOption}</span>}</p>
        </label>
    )
}

export default checkbox