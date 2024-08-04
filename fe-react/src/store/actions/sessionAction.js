import types from '../types'

const sessionAction = {}

sessionAction.setIsUsingLayout = isUsingLayout => {
    return {
        type: types.IS_USING_LAYOUT,
        payload: { isUsingLayout },
    }
}

sessionAction.setIsDarkMode = isDarkMode => {
    return {
        type: types.IS_DARK_MODE,
        payload: { isDarkMode },
    }
}

sessionAction.setIsOsDarkMode = isOsDarkMode => {
    return {
        type: types.IS_OS_DARK_MODE,
        payload: { isOsDarkMode },
    }
}

sessionAction.setTheme = theme => {
    localStorage.setItem('THEME', theme)
    return {
        type: types.THEME,
        payload: { theme },
    }
}

sessionAction.setMessageBox = messageBox => {
    return {
        type: types.MESSAGE_BOX,
        payload: { messageBox },
    }
}

sessionAction.setIsShowProgressBar = isShowProgressBar => {
    return {
        type: types.IS_SHOW_PROGRESS_BAR,
        payload: { isShowProgressBar },
    }
}

sessionAction.setShowWindow = showWindow => {
    return {
        type: types.SHOW_WINDOW,
        payload: { showWindow },
    }
}

export default sessionAction
