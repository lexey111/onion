import {observer} from "mobx-react-lite";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {globalState} from "../store/global-state.ts";
import React, {useCallback} from "react";

export const LogoutIntentGuard: React.FC = observer(() => {
	const handleCancel = useCallback(() => {
		globalState.authState.resetLogoutIntent()
	}, [])

	const handleLogout = useCallback(() => {
		globalState.authService.logout()
	}, [])

	return <Dialog
		open={globalState.authState.logoutIntent}
		onClose={handleCancel}
	>
		<DialogTitle id="alert-dialog-title">
			Logout
		</DialogTitle>
		<DialogContent>
			Are you sure you want to logout?
		</DialogContent>
		<DialogActions>
			<Button onClick={handleCancel} autoFocus>
				Cancel
			</Button>
			<Button onClick={handleLogout} color={'error'} variant={'contained'} size={'small'}>Logout</Button>
		</DialogActions>
	</Dialog>
})
