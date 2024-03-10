import {observer} from "mobx-react-lite";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {globalState} from "../store/global-state.ts";
import React, {useCallback} from "react";

export const NavigationGuard: React.FC = observer(() => {
	const handleCancel = useCallback(() => {
		globalState.navigationService.resetIntent()
	}, [])

	const handleOk = useCallback(() => {
		globalState.navigationService.confirmIntent()
	}, [])

	return <Dialog
		open={globalState.uiState.navigationGuardRequest}
		onClose={handleCancel}
	>
		<DialogTitle id="alert-dialog-title">
			Navigation warning
		</DialogTitle>
		<DialogContent>
			You are trying to navigate out from a page with unsaved changes. If you continue, all changes will be lost.
			Are you sure you want to continue?
		</DialogContent>
		<DialogActions>
			<Button onClick={handleCancel} autoFocus>
				Cancel
			</Button>
			<Button onClick={handleOk} variant={'contained'} size={'small'}>Navigate anyway</Button>
		</DialogActions>
	</Dialog>
})
