import { atom } from "recoil";

export const AdminAtom = atom({
    key: 'AdminAtom',
    default: {
        logo: '',
        logoSize : {width: '', height: ''}
    }  
})

export const LogoAtom = atom({
    key: 'logo',
    default : ''
})

export const LogoSizeAtom = atom({
    key: 'logoSize',
    default : { width: '', height : ''}
})

export const mainMenuAtom = atom({
    key: 'mainMenu',
    default: [{mainIdx : 0, mainName: '', mainPath: ''}]
})

export const subMenuAtom = atom({
    key: 'subMenu',
    default: {}
})

/** SmartModal */
export const SmartModalOpenAtom = atom({
    key: 'SMOPEN',
    default : {isOpen : false, selection: ''}
})