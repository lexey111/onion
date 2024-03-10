import {observer} from "mobx-react-lite"
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	styled,
	Typography
} from "@mui/material"
import {globalState} from "../store/global-state.ts"
import {AgGridReact} from 'ag-grid-react'
import {ColDef, RowDoubleClickedEvent} from 'ag-grid-community'
import React, {useCallback, useRef, useState} from "react"
import {Customer} from "../services/customers-types.ts"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

export const StyledTopbar = styled(Box)`
	width: 100%;
	margin-bottom: ${({theme}) => theme.spacing(1)};
	background: rgba(255, 255, 255, .5);
	border-radius: 6px;
	height: 40px;
	display: flex;
	align-items: center;

	button {
		margin: 0 ${({theme}) => theme.spacing(1)};
	}

	svg {
		width: 18px;
		height: 18px;
	}
`
export const CustomersPage: React.FC = observer(() => {
	const gridRef = useRef<any>()

	const [selectedRow, setSelectedRow] = useState('')

	const [colDefs] = useState<ColDef<Customer, unknown>[]>([
		{field: 'id', hide: true},
		{field: 'name', flex: 2, cellStyle: {fontWeight: '500'}},
		{field: 'created_at', headerName: 'Created at', flex: 1, cellStyle: {fontWeight: '200', color: '#305379'}},
	])

	const handleDetails = useCallback((event: RowDoubleClickedEvent) => {
		globalState.customerState.setCurrentCustomer('')
		globalState.customerState.setCurrentCustomer(event.data.id)
	}, [])

	const handleEdit = useCallback(() => {
		globalState.customerState.setCurrentCustomer('')
		globalState.customerState.setCurrentCustomer(selectedRow)
	}, [selectedRow])

	const handleRowSelected = useCallback((event: any) => {
		if (!event.node.selected) {
			return
		}
		setSelectedRow(() => event?.data?.id || '')
	}, [])

	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

	const handleDelete = useCallback(() => {
		setShowDeleteConfirmation(true)
	}, [showDeleteConfirmation])

	const doDelete = useCallback(() => {
		setShowDeleteConfirmation(false)
		globalState.customerState.customersDataService.deleteCustomer(selectedRow)
	}, [selectedRow])

	const handleAdd = useCallback(() => {
		globalState.customerState.setCurrentCustomer('')
		globalState.customerState.setCurrentCustomer('new')
	}, [selectedRow])

	const disableActions = !selectedRow || globalState.customerState.fetching || globalState.customerState.loading
	const disableAdd = globalState.customerState.fetching || globalState.customerState.loading

	return <>
		<div
			className="ag-theme-quartz"
			style={{height: '70%', width: '100%', padding: 0}}
		>
			<StyledTopbar>
				<IconButton
					size={'small'}
					onClick={handleEdit}
					disabled={disableActions}>
					<EditOutlinedIcon/>
				</IconButton>
				<Divider orientation="vertical"/>
				<IconButton
					size={'small'}
					onClick={handleAdd}
					disabled={disableAdd}>
					<AddCircleOutlineOutlinedIcon/>
				</IconButton>
				<Divider orientation="vertical"/>
				<IconButton
					size={'small'}
					onClick={handleDelete}
					disabled={disableActions}>
					<DeleteOutlineOutlinedIcon/>
				</IconButton>
			</StyledTopbar>

			<AgGridReact
				rowData={globalState.customerState.customers}
				ref={gridRef}
				columnDefs={colDefs}
				rowSelection={'single'}
				suppressRowDeselection={true}
				suppressCellFocus={true}
				onRowDoubleClicked={handleDetails}
				onRowSelected={handleRowSelected}
				suppressScrollOnNewData={true}
			/>

			<Box mt={2}>
				<Typography variant={'body2'} color={'#4f7a70'}>
					You can double click on a record to see details
				</Typography>
			</Box>
		</div>

		<Dialog
			open={showDeleteConfirmation}
			onClose={() => setShowDeleteConfirmation(false)}
		>
			<DialogTitle id="alert-dialog-title">
				Confirmation
			</DialogTitle>
			<DialogContent>
				Are you sure you want to delete this record?
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setShowDeleteConfirmation(false)} autoFocus>
					Cancel
				</Button>
				<Button onClick={doDelete} variant={'contained'} color={'error'} size={'small'}>Delete</Button>
			</DialogActions>
		</Dialog>
	</>
})
