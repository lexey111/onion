import {observer} from "mobx-react-lite"
import {Alert, Autocomplete, TextField} from "@mui/material"
import {globalState} from "../../store/global-state.ts"
import {toJS} from "mobx"

type DetailsPageCustomerSelectorProps = {
	disabled: boolean
}

export const DetailsPageCustomerSelector: React.FC<DetailsPageCustomerSelectorProps> = observer(({disabled}) => {
	const isNewCustomer = globalState.customerState.currentCustomerId === 'new' || globalState.customerState.currentCustomerId === '0'

	const options = toJS(globalState.customerState.selectOptions)
	const value = options.find(o => o.id === globalState.customerState.currentCustomerId)
	if (isNewCustomer) {
		return <Alert severity="info">New customer</Alert>
	}
	if (!value) {
		return <Alert severity="error">Customer {globalState.customerState.currentCustomerId} not found</Alert>
	}

	return (
		<Autocomplete
			size={'small'}
			value={value}
			disabled={disabled}
			onChange={(_, newValue: { id: string, label: string }) => {
				globalState.customerState.setCurrentCustomer(newValue.id)
			}}
			disableClearable={true}
			renderInput={(params) => <TextField {...params} label="Customer"/>}
			options={options}/>
	)
})
