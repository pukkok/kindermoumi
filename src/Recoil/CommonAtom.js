import { atom } from "recoil"

export const headerPaddingTopAtom = atom({
    key: 'header-paddingTop',
    default : 60
})

export const isLoginAtom = atom({
    key: 'isLogin',
    default: false
})