import {Box, styled, TextField} from "@mui/material";
import {CustomerDetailed} from "../../services/customers-types.ts";

export const StyledControl = styled(Box)`
	width: 100%;
	margin-bottom: ${({theme}) => theme.spacing(2)};

	.MuiFormControl-root {
		width: 100%;

		label[data-shrink="false"] {
			color: #c6cebe;
			font-size: 12px;
			padding-top: 3px;
		}
	}
`

type DetailsPageCustomerFormProps = {
	data: CustomerDetailed
	onChange: (fieldName: string, value: any) => void
}

export const DetailsPageCustomerForm: React.FC<DetailsPageCustomerFormProps> = ({data, onChange}) => {
	return (<>
			<StyledControl>
				<TextField
					variant={'outlined'} size={'small'} label={'Name'} value={data.name || ''} autoFocus={true}
					autoComplete='off'
					onChange={(e) => onChange('name', e.target.value)}/>
			</StyledControl>

			<StyledControl>
				<TextField
					variant={'outlined'} size={'small'} label={'Description'} value={data.description || ''}
					autoComplete='off'
					onChange={(e) => onChange('description', e.target.value)}/>
			</StyledControl>

			<StyledControl>
				<TextField
					variant={'outlined'} size={'small'} label={'Location'} value={data.location || ''}
					autoComplete='off'
					onChange={(e) => onChange('location', e.target.value)}/>
			</StyledControl>
			<StyledControl>
				<TextField
					type="number" variant={'outlined'} size={'small'} label={'Expenses'} autoComplete='off'
					value={data.expenses || 0}
					onChange={(e) => onChange('expenses', e.target.value)}/>
			</StyledControl>
			<StyledControl>
				<TextField
					type="number" variant={'outlined'} size={'small'} label={'Calls'} value={data.calls || 0}
					autoComplete='off'
					onChange={(e) => onChange('calls', e.target.value)}/>
			</StyledControl>
		</>
	)
}
