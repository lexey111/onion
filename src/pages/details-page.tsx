import {observer} from "mobx-react-lite"
import {Box, Button, Card} from "@mui/material"
import {globalState} from "../store/global-state.ts"
import {DetailsPageCustomerSelector} from "./details/details-customer-selector.tsx"
import React, {useCallback, useEffect, useState} from "react"
import {DetailsPageCustomerForm} from "./details/details-customer-form.tsx"
import {DetailsPageCustomerSkeleton} from "./details/details-customer-skeleton.tsx"
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded"
import {CustomerDetailed, NoCustomer} from "../services/customers-types.ts"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'

export const DetailsPage: React.FC = observer(() => {
	const isNewCustomer = globalState.customerState.currentCustomerId === 'new' || globalState.customerState.currentCustomerId === '0'

	let data: CustomerDetailed
	if (!isNewCustomer) {
		data = globalState.customerState.details[globalState.customerState.currentCustomerId]
	} else {
		data = {...NoCustomer}
	}

	const [localData, setLocalData] = useState<CustomerDetailed>({...NoCustomer})
	const [hasChanges, setHasChanges] = useState(false)

	useEffect(() => {
		if (!isNewCustomer) {
			console.log('Set data', data)
			setLocalData(data)
		}

	}, [data]);

	useEffect(() => {
		const changed = JSON.stringify(data) !== JSON.stringify(localData)
		setHasChanges(changed)
	}, [localData, data])

	useEffect(() => {
		if (hasChanges) {
			globalState.navigationService.setHasChanges()
		} else {
			globalState.navigationService.resetHasChanges()
		}
	}, [hasChanges])

	const handleChanges = useCallback((fieldName: string, value: any) => {
		setLocalData((v) => ({...v, [fieldName]: value}))
	}, [])

	return <>
		<div className={"app-form"}>
			<Card sx={{padding: 2, marginBottom: 2}}>
				<DetailsPageCustomerSelector disabled={hasChanges}/>
			</Card>
		</div>

		<Card sx={{padding: 2, marginBottom: 1}}>
			{!localData && <DetailsPageCustomerSkeleton/>}
			{localData && <DetailsPageCustomerForm data={localData} onChange={handleChanges}/>}
		</Card>

		<div className={"app-form"}>
			<Box sx={{width: '100%', textAlign: 'center', marginTop: 2}}>
				<Button
					variant={'outlined'}
					sx={{marginRight: 2}}
					onClick={() => {
						globalState.navigationService.navigateBack()
					}}>
					<ArrowBackRoundedIcon/>
					Back
				</Button>
				<Button
					variant={'contained'}
					disabled={!hasChanges || !localData?.name}
					onClick={() => {
						globalState.customerState.customersDataService.saveCustomerData(localData)
						globalState.navigationService.resetHasChanges()
						globalState.navigationService.navigateBack()
					}}>
					<SaveOutlinedIcon/>
					Save
				</Button>
			</Box>
		</div>
	</>
})
