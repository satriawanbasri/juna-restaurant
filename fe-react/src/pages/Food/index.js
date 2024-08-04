import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { Box, Button, Divider, Modal, TextField, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import actions from '../../store/actions'
import { fetch } from '../../utils'

let editedFood = null

const foodValidationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    pictureUrl: yup.string().required('Picture url is required'),
    price: yup.number().required('Price is required'),
})

const Food = props => {
    const [foodRows, setFoodRows] = useState([])
    const [isShowFoodWindow, setIsShowFoodWindow] = useState(false)
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0,
    })
    const foodForm = useForm({
        resolver: yupResolver(foodValidationSchema),
    })

    useEffect(() => {
        getFoods()
    }, [])

    useEffect(() => {
        if (props.messageBox?.isDeleteFood && props.messageBox?.isConfirmed) {
            props.setMessageBox({ ...props.messageBox, isDeleteFood: false })
            deleteFoodConfirmed(props.messageBox?.foodId)
        }
    }, [props.messageBox?.isDeleteFood, props.messageBox?.isConfirmed])

    const getFoods = async () => {
        props.setIsShowProgressBar(true)
        const result = await fetch(null, process.env.REACT_APP_API_BASE_URL, '/food/get-foods')
        props.setIsShowProgressBar(false)
        if (result.isSuccess) {
            const foods = result.data
            if (foods) setFoodRows(foods)
        } else props.setMessageBox({ ...result, isShow: true })
    }

    const editFood = async id => {
        props.setIsShowProgressBar(true)
        const result = await fetch(null, process.env.REACT_APP_API_BASE_URL, '/food/get-food-by-id?id=' + id)
        props.setIsShowProgressBar(false)
        if (result.isSuccess) {
            const food = result.data
            if (food) {
                editedFood = food
                Object.keys(foodForm.getValues()).forEach(field => {
                    foodForm.setValue(field, food[field])
                })
                setIsShowFoodWindow(true)
            }
        } else props.setMessageBox({ ...result, isShow: true })
    }

    const deleteFood = async id => {
        props.setMessageBox({
            isShow: true,
            status: 'CONFIRMATION',
            message: 'Are you sure want to delete this Food?',
            isDeleteFood: true,
            foodId: id,
            isConfirmed: false,
        })
    }

    const deleteFoodConfirmed = async id => {
        props.setIsShowProgressBar(true)
        const result = await fetch(null, process.env.REACT_APP_API_BASE_URL, '/food/delete-food?id=' + id)
        props.setIsShowProgressBar(false)
        props.setMessageBox({ ...result, isShow: true })
        if (result.isSuccess) getFoods()
    }

    const addFood = () => {
        editedFood = null
        Object.keys(foodForm.getValues()).forEach(field => {
            foodForm.setValue(field, undefined)
        })
        setIsShowFoodWindow(true)
    }

    const cancelFood = () => {
        setIsShowFoodWindow(false)
    }

    const saveFood = async food => {
        if (editedFood) {
            food = { ...editedFood, ...food }
            editedFood = null
        }

        props.setIsShowProgressBar(true)
        const result = await fetch(null, process.env.REACT_APP_API_BASE_URL, '/food/save-food', food)
        props.setIsShowProgressBar(false)
        props.setMessageBox({ ...result, isShow: true })
        if (result.isSuccess) {
            setIsShowFoodWindow(false)
            getFoods()
        }
    }

    return (
        <div>
            <Typography variant="h5">Foods</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Button onClick={addFood} startIcon={<AddIcon />}>
                Add
            </Button>

            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        rows={foodRows}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[10, 20, 40, 100]}
                        getRowHeight={() => 'auto'}
                        disableRowSelectionOnClick
                        autoHeight
                        columns={[
                            {
                                field: 'no',
                                headerName: 'No',
                                headerAlign: 'right',
                                align: 'right',
                                filterable: false,
                                width: 0,
                                renderCell: e => {
                                    const rowIndex = e.api.getRowIndexRelativeToVisibleRows(e.row.id)
                                    if (rowIndex) return paginationModel.page * paginationModel.pageSize + rowIndex + 1
                                    else return paginationModel.page * paginationModel.pageSize + 1
                                },
                            },
                            {
                                field: 'pictureUrl',
                                headerName: '',
                                width: 140,
                                renderCell: e => <img width={100} src={e.value} style={{ margin: 4 }} />,
                            },
                            { field: 'name', headerName: 'Name', width: 300 },
                            { field: 'price', headerName: 'Price', width: 500 },
                            {
                                field: 'actions',
                                headerName: 'Actions',
                                headerAlign: 'center',
                                width: 150,
                                renderCell: e => {
                                    return (
                                        <div>
                                            <Tooltip title="Edit">
                                                <Button onClick={() => editFood(e.row.id)}>
                                                    <EditIcon />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <Button onClick={() => deleteFood(e.row.id)}>
                                                    <DeleteIcon />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    )
                                },
                            },
                        ]}
                    />
                </div>
            </div>

            <Modal open={isShowFoodWindow}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        width: 800,
                        p: 4,
                        pb: 2.6,
                    }}>
                    <Typography variant="h5">Food</Typography>
                    <br />
                    <Box
                        component="form"
                        sx={{
                            maxWidth: '100%',
                            width: 800,
                        }}>
                        <TextField
                            label="Name *"
                            {...foodForm.register('name')}
                            error={!!foodForm.formState.errors['name']}
                            helperText={foodForm.formState.errors['name']?.message}
                            variant="standard"
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Picture url *"
                            {...foodForm.register('pictureUrl')}
                            error={!!foodForm.formState.errors['pictureUrl']}
                            helperText={foodForm.formState.errors['pictureUrl']?.message}
                            variant="standard"
                            margin="normal"
                            fullWidth
                            multiline
                            rows={3}
                        />
                        <TextField
                            label="Price *"
                            {...foodForm.register('price')}
                            error={!!foodForm.formState.errors['price']}
                            helperText={foodForm.formState.errors['price']?.message}
                            variant="standard"
                            margin="normal"
                            fullWidth
                            type="number"
                        />
                    </Box>
                    <br />
                    <Box display="flex" justifyContent="flex-end">
                        <Button onClick={cancelFood}>Cancel</Button>
                        <Button onClick={foodForm.handleSubmit(saveFood)}>Save</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default connect(
    state => {
        const { sessionReducer } = state
        return { ...sessionReducer }
    },
    { ...actions.sessionAction }
)(Food)
