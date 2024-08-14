import React, { useEffect, useRef, useState } from "react"
import './styles/SelectOption.css'
import classNames from "classnames"

/** ul className : select-ul, li className : select-li */
function SelectOption({ list, selectedItem, setSelectedItem }) {

    const liRef = useRef([])
    const [minWidth, setMinWidth] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // 선택된 아이템의 width를 가져와서 minWidth로 설정
        const activeLi = liRef.current.find(li => li && li.classList.contains("active"))
        if (activeLi) {
            setMinWidth(activeLi.offsetWidth)
        }
    }, [selectedItem, list])

    const changeItem = (item) => {
        setSelectedItem(item)
        setIsOpen(false)
    }

    const listOpen = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <div className="select-option">
            <p className="active" onClick={listOpen}>{selectedItem}</p>
            <ul
                className={classNames("select-ul", { on: isOpen })}
                style={{ minWidth: `${minWidth}px` }} // minWidth를 설정
            >
                {list.map((item, idx) =>
                    <li
                        key={idx}
                        ref={el => liRef.current[idx] = el}
                        className={classNames("select-li", { active: item === selectedItem })}
                        onClick={() => changeItem(item)}
                    >{item}</li>
                )}
            </ul>
        </div>
    )
}

export default SelectOption
