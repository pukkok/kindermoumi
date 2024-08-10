import { atom } from "recoil"

export const headerPaddingTopAtom = atom({
    key: 'header-paddingTop',
    default : 60
})

export const isLoginAtom = atom({
    key: 'isLogin',
    default: false
})

export const kinderUrlAtom = atom({
    key: 'kinderUrl',
    default: ''
})

// 피아노 파트
export const isScrollModeAtom = atom({
    key: 'isScroll',
    default:false
})

export const isChangeModeAtom = atom({
    key: 'isChangeMode',
    default : false
})

export const pianoVolumeAtom = atom({
    key: 'volume',
    default : 0.5
})

export const scoresAtom = atom({
    key: 'scores',
    default : ['네가있어행복해']
})

export const selectedNotesAtom = atom({
    key: 'selectedNotes',
    default : []
})

export const startSelectedNoteAtom = atom({
    key: 'startSelectedNote',
    default : 'C2'
})

export const endSelectedNoteAtom = atom({
    key: 'endSelectedNote',
    default : 'C5'
})