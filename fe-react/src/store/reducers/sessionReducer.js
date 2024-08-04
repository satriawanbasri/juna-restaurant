import types from '../types'

const initialState = {
    isUsingLayout: true,
    isDarkMode: false,
    isOsDarkMode: false,
    theme: 'SYSTEM',
    messageBox: null,
    isShowProgressBar: false,
    showWindow: null,
}

const theme = localStorage.getItem('THEME')
if (theme) initialState.theme = theme

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.IS_USING_LAYOUT:
            return { ...state, isUsingLayout: action.payload.isUsingLayout }
        case types.IS_DARK_MODE:
            return { ...state, isDarkMode: action.payload.isDarkMode }
        case types.IS_OS_DARK_MODE:
            return { ...state, isOsDarkMode: action.payload.isOsDarkMode }
        case types.THEME:
            return { ...state, theme: action.payload.theme }
        case types.MESSAGE_BOX:
            return { ...state, messageBox: action.payload.messageBox }
        case types.IS_SHOW_PROGRESS_BAR:
            return {
                ...state,
                isShowProgressBar: action.payload.isShowProgressBar,
            }
        case types.SHOW_WINDOW:
            return {
                ...state,
                showWindow: action.payload.showWindow,
            }
        default:
            return state
    }
}

export default sessionReducer
