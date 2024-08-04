import { useEffect, useState } from 'react'
import { Delete as DeleteIcon, DoneOutline, Receipt } from '@mui/icons-material'
import { Box, Button, Divider, Modal, Tooltip, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'
import { connect } from 'react-redux'
import actions from '../../store/actions'
import { fetch } from '../../utils'

const Order = props => {
    const [orderRows, setOrderRows] = useState([])
    const [orderFoodRows, setOrderFoodRows] = useState([])
    const [tableNumber, setTableNumber] = useState(0)
    const [isShowOrderWindow, setIsShowOrderWindow] = useState(false)
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0,
    })
    const [paginationModel2, setPaginationModel2] = useState({
        pageSize: 10,
        page: 0,
    })
    const theme = useTheme()

    useEffect(() => {
        getOrders()
    }, [])

    useEffect(() => {
        if (props.messageBox?.isDeleteOrder && props.messageBox?.isConfirmed) {
            props.setMessageBox({ ...props.messageBox, isDeleteOrder: false })
            deleteOrderConfirmed(props.messageBox?.orderId)
        }
        if (props.messageBox?.isUpdateOrderStatus && props.messageBox?.isConfirmed) {
            props.setMessageBox({ ...props.messageBox, isUpdateOrderStatus: false })
            updateOrderStatusConfirmed(props.messageBox?.orderId)
        }
    }, [props.messageBox?.isDeleteOrder, props.messageBox?.isUpdateOrderStatus, props.messageBox?.isConfirmed])

    const getOrders = async () => {
        props.setIsShowProgressBar(true)
        const result = await fetch(null, process.env.REACT_APP_API_BASE_URL, '/order/get-orders')
        props.setIsShowProgressBar(false)
        if (result.isSuccess) {
            const orders = result.data
            if (orders) setOrderRows(orders)
        } else props.setMessageBox({ ...result, isShow: true })
    }

    const deleteOrder = async id => {
        props.setMessageBox({
            isShow: true,
            status: 'CONFIRMATION',
            message: 'Are you sure want to delete this Order?',
            isDeleteOrder: true,
            orderId: id,
            isConfirmed: false,
        })
    }

    const deleteOrderConfirmed = async id => {
        props.setIsShowProgressBar(true)
        const result = await fetch(null, process.env.REACT_APP_API_BASE_URL, '/order/delete-order?id=' + id)
        props.setIsShowProgressBar(false)
        props.setMessageBox({ ...result, isShow: true })
        if (result.isSuccess) getOrders()
    }

    const updateOrderStatus = async id => {
        props.setMessageBox({
            isShow: true,
            status: 'CONFIRMATION',
            message: 'Are you sure this order has been served?',
            isUpdateOrderStatus: true,
            orderId: id,
            isConfirmed: false,
        })
    }

    const updateOrderStatusConfirmed = async id => {
        props.setIsShowProgressBar(true)
        const result = await fetch(null, process.env.REACT_APP_API_BASE_URL, '/order/update-order-status?id=' + id)
        props.setIsShowProgressBar(false)
        props.setMessageBox({ ...result, isShow: true })
        if (result.isSuccess) getOrders()
    }

    const viewOrder = async (id, tableNumberParam) => {
        setTableNumber(tableNumberParam)
        props.setIsShowProgressBar(true)
        const result = await fetch(null, process.env.REACT_APP_API_BASE_URL, '/order/get-view-order?order_id=' + id)
        props.setIsShowProgressBar(false)
        if (result.isSuccess) {
            const orderFoods = result.data
            const orderFoodRowTemps = []
            for (const orderFood of orderFoods) {
                const orderFoodRowTemp = {}
                orderFoodRowTemp.id = orderFood.id
                orderFoodRowTemp.name = orderFood.food.name
                orderFoodRowTemp.pictureUrl = orderFood.food.pictureUrl
                orderFoodRowTemp.quantity = orderFood.quantity
                orderFoodRowTemp.price = orderFood.price
                orderFoodRowTemp.subTotalPrice = orderFood.subTotalPrice
                orderFoodRowTemps.push(orderFoodRowTemp)
            }
            setOrderFoodRows(orderFoodRowTemps)
            setIsShowOrderWindow(true)
        } else props.setMessageBox({ ...result, isShow: true })
    }

    const cancelOrder = () => {
        setIsShowOrderWindow(false)
    }

    return (
        <div>
            <Typography variant="h5">Orders</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <br />
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        rows={orderRows}
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
                            { field: 'tableNumber', headerName: 'Table Number', width: 120, align: 'center' },
                            { field: 'totalQuantity', headerName: 'Total Quantity', width: 120, align: 'center' },
                            { field: 'totalPrice', headerName: 'Total Price', width: 180 },
                            {
                                field: 'status',
                                headerName: 'Status',
                                width: 450,
                                renderCell: e => {
                                    return (
                                        <div>
                                            {e.value == 'Waiting' && (
                                                <Typography color={theme.palette.warning.main} sx={{ fontWeight: 'bold' }}>
                                                    {e.value}
                                                </Typography>
                                            )}
                                            {e.value == 'Served' && (
                                                <Typography color={theme.palette.success.main} sx={{ fontWeight: 'bold' }}>
                                                    {e.value}
                                                </Typography>
                                            )}
                                        </div>
                                    )
                                },
                            },
                            {
                                field: 'actions',
                                headerName: 'Actions',
                                headerAlign: 'center',
                                width: 220,
                                renderCell: e => {
                                    return (
                                        <div>
                                            <Tooltip title="Update Status">
                                                <Button onClick={() => updateOrderStatus(e.row.id)} disabled={e.row.status == 'Served'}>
                                                    <DoneOutline />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="View Order">
                                                <Button onClick={() => viewOrder(e.row.id, e.row.tableNumber)}>
                                                    <Receipt />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <Button onClick={() => deleteOrder(e.row.id)}>
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

            <Modal open={isShowOrderWindow}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        width: 1100,
                        p: 4,
                        pb: 2.6,
                    }}>
                    <Typography variant="h5">View Order - Table Number {tableNumber}</Typography>
                    <br />
                    <div style={{ display: 'flex', height: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGrid
                                rows={orderFoodRows}
                                paginationModel={paginationModel2}
                                onPaginationModelChange={setPaginationModel2}
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
                                            if (rowIndex) return paginationModel2.page * paginationModel2.pageSize + rowIndex + 1
                                            else return paginationModel2.page * paginationModel2.pageSize + 1
                                        },
                                    },
                                    {
                                        field: 'pictureUrl',
                                        headerName: '',
                                        width: 140,
                                        renderCell: e => <img width={100} src={e.value} style={{ margin: 4 }} />,
                                    },
                                    { field: 'name', headerName: 'Name', width: 240 },
                                    { field: 'quantity', headerName: 'Quantity', width: 160 },
                                    { field: 'price', headerName: 'Price', width: 160 },
                                    { field: 'subTotalPrice', headerName: 'Sub Total Price', width: 160 },
                                ]}
                            />
                        </div>
                    </div>
                    <br />
                    <Box display="flex" justifyContent="flex-end">
                        <Button onClick={cancelOrder}>Cancel</Button>
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
)(Order)
