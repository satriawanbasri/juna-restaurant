import { useEffect } from 'react'
import { CssBaseline, useMediaQuery } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { connect } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import actions from './store/actions'
import { Layout } from './components'
import { Food, Home, Order, Setting } from './pages'

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
})

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

const App = props => {
    const isOsDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const theme = props.isDarkMode ? darkTheme : lightTheme

    useEffect(() => {
        props.setIsOsDarkMode(isOsDarkMode)
        props.setIsDarkMode(props.theme === 'SYSTEM' ? props.isOsDarkMode : props.theme === 'DARK' ? true : false)
    }, [isOsDarkMode, props.theme, props.isOsDarkMode])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/orders" element={<Order />} />
                        <Route path="/foods" element={<Food />} />
                        <Route path="/settings" element={<Setting />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default connect(
    state => {
        const { sessionReducer } = state
        return { ...sessionReducer }
    },
    { ...actions.sessionAction }
)(App)
