import { atom } from "recoil";

export const adminThemeAtom = atom({
    key: 'admin-theme',
    default: 'page'
})
export const moveLinkAtom = atom({
    key: 'move-link',
    default: ''
})

export const HeaderAtom = atom({
    key: 'header',
    default: 60
})

export const HeaderGapAtom = atom({
    key: 'headerGap',
    default: 40
})

export const HeaderContainerAtom = atom({
    key: 'headerContainer',
    default: { width: 1240, unit: 'px' }
})


/** 로고 파트 */
export const LogoAtom = atom({
    key: 'logo',
    default : ''
})
export const LogoSizeAtom = atom({
    key: 'logoSize',
    default : { width: 150, height : 40}
})

/** 네비게이션 파트 */
export const mainMenuAtom = atom({
    key: 'mainMenu',
    default: [{mainIdx : 0, mainName: '', mainPath: ''}]
})
export const subMenuAtom = atom({
    key: 'subMenu',
    default: {}
})
export const navFlexAtom = atom({
    key: 'nav-flex',
    default: {style : '' , gap : ''}
})

/** 배경 파트 */
export const bgAtom = atom({
    key: 'bg',
    default: ''
})
export const loadBgsAtom = atom({
    key: 'loadBgs',
    default: []
})
export const bgHeightAtom = atom({
    key: 'bgHeight',
    default: 400
})

/** 컨텐츠 파트 */
export const xyCountAtom = atom({
    key: 'xyCount',
    default: {}
})
export const gridZoneAtom = atom({ // 컨텐츠 그리드 구역
    key: 'gridZone',
    default: {}
})

export const contentsContainerAtom = atom({
    key: 'contentsContainer',
    default : { width:'1240', unit: 'px' }// 디폴트 값
})

/** SmartModal */
export const SmartModalOpenAtom = atom({
    key: 'SMOPEN',
    default : {isOpen : false, selection: ''}
})





/** 식단관리 파트 */

export const deleteYOILAtom = atom({
    key: 'deleteYOIL',
    default : []
})

export const sideOptionsAtom = atom({
    key: 'menuSideOptions',
    default : []
})

export const MenusAtom = atom({
    key: 'menus',
    default: []
})

export const selectMonthAtom = atom({
    key: 'selectMonth',
    default: ''
})

export const dayColorOptionsAtom = atom({
    key: 'dayColorOptions',
    default: {backgound : '#fff' , color: '#000', isBold: false}
})