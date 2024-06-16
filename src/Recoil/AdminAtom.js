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


/** SmartModal */
export const SmartModalOpenAtom = atom({
    key: 'SMOPEN',
    default : false
})