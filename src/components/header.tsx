import {globalState} from "../store/global-state.ts";
import {observer} from "mobx-react-lite";
import {Avatar, Divider, IconButton, Menu, MenuItem, Skeleton, Typography} from "@mui/material";
import React, {useCallback} from "react";

export const Header: React.FC = observer(() => {
	const loading = globalState.authState.loading

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
		if (anchorEl) {
			setAnchorEl(null)
		} else {
			setAnchorEl(event.currentTarget)
		}
	}, [anchorEl])

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleLogout = useCallback(() => {
		handleClose()
		globalState.authState.setLogoutIntent()
	}, [])

	return (
		<div className="app-header">
			<div className={'app-header-logo'}></div>
			<Typography variant="h2" sx={{marginRight: '16px', fontWeight: 100}}>
				Onion CRM
			</Typography>
			{loading && <Skeleton animation="wave" variant="circular" width={56} height={56}/>}

			{!loading && globalState.authState.isLoggedIn && <IconButton
				onClick={handleClick}
				size="small"
				sx={{ml: 2}}
				aria-controls={open ? 'account-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
			>
				<Avatar
					alt="Avatar"
					sx={{width: 56, height: 56}}
					src={globalState.authState.userData.avatar}
				/>
				<Menu
					anchorEl={anchorEl}
					id="account-menu"
					open={open}
					onClose={handleClose}
					slotProps={{
						paper: {
							elevation: 0,
							sx: {
								overflow: 'visible',
								filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
								mt: 1.0,
								'& .MuiAvatar-root': {
									width: 56,
									height: 56,
									ml: -0.5,
									mr: 1,
								},
								'&::before': {
									content: '""',
									display: 'block',
									position: 'absolute',
									top: 0,
									right: 28,
									width: 10,
									height: 10,
									bgcolor: 'background.paper',
									transform: 'translateY(-50%) rotate(45deg)',
									zIndex: 0,
								},
							},
						}
					}}
					transformOrigin={{horizontal: 'right', vertical: 'top'}}
					anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
				>
					<MenuItem onClick={globalState.navigationService.navigateLoginPage}>Profile</MenuItem>
					<MenuItem onClick={globalState.navigationService.navigateCustomerPage}>Customers</MenuItem>
					<Divider/>
					<MenuItem onClick={handleLogout}>Logout</MenuItem>
				</Menu>
			</IconButton>}
		</div>
	)
})
