import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

function CountBtn ({count, setCount, gap=1, addClass}) {

    const [isClick, setIsClick] = useState(false)
    const [calc, setCalc] = useState('')
    const clickDown = (type) => {
        setIsClick(true)
        setCalc(type)
    }

    const clickUp = () => {
        setIsClick(false)
    }

    useEffect(()=>{
        let timer
        if(isClick){
            if(calc === 'plus'){
                timer = setInterval(() => {
                    setCount(prev => +prev + gap)
                }, 100);
            }else{
                timer = setInterval(() => {
                    setCount(prev => +prev - gap)
                }, 100);
            }
        }else{
            clearInterval(timer)
        }

        return () => clearInterval(timer)
    
    },[isClick])

    const minus = () => {
        setCount(+count - gap)
    }

    const plus = () => {
        setCount(+count + gap)
    }

    return(
        <>
            <span className={classNames("material-symbols-outlined", addClass && addClass)} 
            onMouseDown={()=>clickDown('minus')} onClick={minus} onMouseUp={clickUp}>arrow_drop_down</span>
            <span className={classNames("material-symbols-outlined", addClass && addClass)} 
            onMouseDown={()=>clickDown('plus')} onClick={plus} onMouseUp={clickUp}>arrow_drop_up</span>
        </>
    )

}

export default CountBtn