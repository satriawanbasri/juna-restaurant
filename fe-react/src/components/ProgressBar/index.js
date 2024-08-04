import { Box, CircularProgress, Dialog } from '@mui/material'
import { connect } from 'react-redux'
import actions from '../../store/actions'

const ProgressBar = props => {
    return (
        <Dialog
            open={props.isShowProgressBar}
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    borderRadius: 30,
                },
            }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                }}>
                <CircularProgress />
            </Box>
        </Dialog>
    )
}

export default connect(
    state => {
        const { sessionReducer } = state
        return { ...sessionReducer }
    },
    { ...actions.sessionAction }
)(ProgressBar)
