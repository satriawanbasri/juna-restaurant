import { Divider, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import { connect } from 'react-redux'
import actions from '../../store/actions'

const Setting = props => {
    const changeTheme = e => {
        props.setTheme(e.target.value)
    }

    return (
        <div>
            <Typography variant="h5">Settings</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <br />
            <br />
            <Grid container>
                <Grid item xs={1}>
                    Theme
                </Grid>
                <Grid item xs={10}>
                    <RadioGroup sx={{ mt: -1 }} value={props.theme} onChange={changeTheme}>
                        <FormControlLabel value="SYSTEM" control={<Radio />} label="System" />
                        <FormControlLabel value="LIGHT" control={<Radio />} label="Light" />
                        <FormControlLabel value="DARK" control={<Radio />} label="Dark" />
                    </RadioGroup>
                </Grid>
            </Grid>
        </div>
    )
}

export default connect(
    state => {
        const { sessionReducer } = state
        return { ...sessionReducer }
    },
    { ...actions.sessionAction }
)(Setting)
