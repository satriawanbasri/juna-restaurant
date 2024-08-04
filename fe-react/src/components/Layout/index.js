import { useState } from 'react'
import {
    Restaurant,
    Brightness4,
    Brightness7,
    Fastfood,
    Home as HomeIcon,
    Menu as MenuIcon,
    Receipt,
    Settings as SettingsIcon,
} from '@mui/icons-material'
import {
    AppBar,
    Avatar,
    Box,
    Button,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { MessageBox, ProgressBar } from '../../components'
import actions from '../../store/actions'

const title = 'Juna Restaurant'
const mainColor = '#ff6347'
const logo = <Restaurant sx={{ fontSize: 50, mr: 3 }} />

const menuItems = [
    { url: '/', text: 'Home', icon: <HomeIcon /> },
    {
        url: '/orders',
        text: 'Orders',
        icon: <Receipt />,
    },
    {
        url: '/foods',
        text: 'Foods',
        icon: <Fastfood />,
    },
    {
        url: '/settings',
        text: 'Settings',
        icon: <SettingsIcon />,
    },
]

const Layout = props => {
    const { window: windowTemp } = props.children
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [anchorElMenuAccount, setAnchorElMenuAccount] = useState(null)
    const isShowMenuAccount = Boolean(anchorElMenuAccount)
    const location = useLocation()
    const container = windowTemp !== undefined ? () => window().document.body : undefined

    const logout = () => {
        localStorage.clear()
        window.location.href = '/authentication/login'
    }

    const menuStyling = menuItem => {
        let styling = {}

        if (location.pathname == menuItem.url)
            if (props.isDarkMode) styling = { background: '#272727' }
            else styling = { background: '#F5F5F5' }

        return styling
    }

    const sideBar = (
        <div>
            <Toolbar />
            <List>
                {menuItems.map(menuItem => (
                    <ListItem disablePadding key={menuItem.text} sx={menuStyling(menuItem)}>
                        <ListItemButton href={menuItem.url}>
                            <ListItemIcon>{menuItem.icon}</ListItemIcon>
                            <ListItemText primary={menuItem.text} sx={{ ml: -2 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    )

    const menuAccount = (
        <Menu
            anchorEl={anchorElMenuAccount}
            open={isShowMenuAccount}
            onClose={() => setAnchorElMenuAccount(null)}
            onClick={() => setAnchorElMenuAccount(null)}>
            <MenuItem sx={{ p: 0 }}>
                <ListItemButton href="/settings">
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Settings
                </ListItemButton>
            </MenuItem>
        </Menu>
    )

    return (
        <div>
            {props.isUsingLayout && (
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        elevation={0}
                        sx={{
                            zIndex: theme => theme.zIndex.drawer + 1,
                            backgroundColor: props.isDarkMode ? '#272727' : mainColor,
                        }}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={() => setIsMobileOpen(!isMobileOpen)}
                                sx={{ mr: 2, display: { sm: 'none' } }}>
                                <MenuIcon />
                            </IconButton>
                            {logo}
                            <Typography variant="h6" noWrap component="div" style={{ flexGrow: 1 }}>
                                {title}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}>
                                <Tooltip title="Darkmode">
                                    <IconButton
                                        onClick={() => {
                                            props.isDarkMode ? props.setTheme('LIGHT') : props.setTheme('DARK')
                                        }}
                                        sx={{ p: 2 }}
                                        color="inherit">
                                        {props.isDarkMode ? <Brightness7 /> : <Brightness4 />}
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            {menuAccount}
                        </Toolbar>
                    </AppBar>
                    <Box
                        component="nav"
                        sx={{
                            width: { sm: 250 },
                            flexShrink: { sm: 0 },
                        }}
                        aria-label="mailbox folders">
                        <Drawer
                            container={container}
                            variant="temporary"
                            open={isMobileOpen}
                            onClose={() => setIsMobileOpen(!isMobileOpen)}
                            ModalProps={{
                                keepMounted: true,
                            }}
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                                '& .MuiDrawer-paper': {
                                    boxSizing: 'border-box',
                                    width: 180,
                                },
                            }}>
                            {sideBar}
                        </Drawer>
                        <Drawer
                            variant="permanent"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                '& .MuiDrawer-paper': {
                                    boxSizing: 'border-box',
                                    width: 180,
                                },
                            }}>
                            {sideBar}
                        </Drawer>
                    </Box>{' '}
                    <div
                        style={{
                            margin: 'auto',
                            width: 1300,
                            paddingTop: 30,
                            paddingBottom: 40,
                            paddingLeft: 10,
                            paddingRight: 10,
                        }}>
                        <Toolbar />
                        {props.children}
                    </div>
                </Box>
            )}
            {!props.isUsingLayout && props.children}
            <MessageBox />
            <ProgressBar />
        </div>
    )
}

export default connect(
    state => {
        const { sessionReducer } = state
        return { ...sessionReducer }
    },
    { ...actions.sessionAction }
)(Layout)
