import { atom } from "recoil";

export const HeaderAtom = atom({
    key: 'header',
    default: '60'
})
export const HeaderFlexAtom = atom({
    key: 'header-flex',
    default: ''
})

/** 로고 파트 */
export const LogoAtom = atom({
    key: 'logo',
    default : ''
})
export const LogoSizeAtom = atom({
    key: 'logoSize',
    default : { width: '', height : ''}
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

/** 배경 파트 */
export const bgAtom = atom({
    key: 'bg',
    default: ''
})
export const loadBgsAtom = atom({
    key: 'loadBgs',
    default: []
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

export const containerSizeAtom = atom({
    key: 'containerSize',
    default : { maxWidth:'1240', width:'1240', minWidth:'1240', unit: 'px' }// 디폴트 값
})

/** SmartModal */
export const SmartModalOpenAtom = atom({
    key: 'SMOPEN',
    default : {isOpen : false, selection: ''}
})