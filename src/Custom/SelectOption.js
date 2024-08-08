import React, { useState } from "react";
import './styles/SelectOption.css'

function SelectOption ({list, children, ulHeight = 100, selectedItem, setSelectedItem}) {

    const changeItem = (item) => {
        setSelectedItem(item)
    }

    const [isOpen, setIsOpen] = useState(false)

    const listOpen = () => {
        setIsOpen(prev => !prev)
    }

    return(
        <ul className="select-ul" style={{height:ulHeight + 'px'}} onClick={listOpen}>
            {children}
            {!isOpen ? selectedItem :
            list.map((item, idx) => 
                <li key={idx} className="select-li" onClick={()=>changeItem(item)}>{item}</li>
            )}
        </ul>
    )
}

export default SelectOption