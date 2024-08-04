import { forwardRef } from 'react'
import { Block, CheckCircle, Dangerous, Help, Info, Warning } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material'
import actions from '../../store/actions'
import { connect } from 'react-redux'

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />
})

const MessageBox = props => {
    const handleClose = () => {
        props.setMessageBox({ isShow: false })
    }

    const handleYes = () => {
        props.setMessageBox({
            ...props.messageBox,
            isShow: false,
            isConfirmed: true,
        })
    }

    return (
        <Dialog open={props.messageBox?.isShow} TransitionComponent={Transition}>
            <Box sx={{ display: 'flex' }}>
                <Box>
                    {props.messageBox?.status === 'SUCCESS' && <CheckCircle sx={{ fontSize: 72, ml: 2, mr: -1.5, mt: 5 }} color="success" />}
                    {props.messageBox?.status === 'WARNING' && <Warning sx={{ fontSize: 72, ml: 2, mr: -1.5, mt: 5 }} color="warning" />}
                    {props.messageBox?.status === 'ERROR' && <Dangerous sx={{ fontSize: 72, ml: 2, mr: -1.5, mt: 5 }} color="error" />}
                    {props.messageBox?.status === 'CONFIRMATION' && <Help sx={{ fontSize: 72, ml: 2, mr: -1.5, mt: 5 }} color="info" />}
                    {props.messageBox?.status === 'UNAUTHORIZED' && <Block sx={{ fontSize: 72, ml: 2, mr: -1.5, mt: 5 }} color="error" />}
                    {props.messageBox?.status === 'INFORMATION' && <Info sx={{ fontSize: 72, ml: 2, mr: -1.5, mt: 5 }} color="info" />}
                </Box>
                <Box>
                    <DialogTitle>
                        {props.messageBox?.status === 'SUCCESS' && 'Success'}
                        {props.messageBox?.status === 'WARNING' && 'Warning'}
                        {props.messageBox?.status === 'ERROR' && 'Error'}
                        {props.messageBox?.status === 'CONFIRMATION' && 'Confirmation'}
                        {props.messageBox?.status === 'UNAUTHORIZED' && 'Unauthorized'}
                        {props.messageBox?.status === 'INFORMATION' && 'Information'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>{props.messageBox?.message}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {props.messageBox?.status === 'CONFIRMATION' && (
                            <div>
                                <Button onClick={handleClose}>No</Button>
                                <Button onClick={handleYes}>Yes</Button>
                            </div>
                        )}
                        {props.messageBox?.status != 'CONFIRMATION' && <Button onClick={handleClose}>Ok</Button>}
                    </DialogActions>
                </Box>
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
)(MessageBox)
