import {observer} from "mobx-react-lite"
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Skeleton, Typography} from "@mui/material"
import {globalState} from "../store/global-state.ts"
import React from "react"
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

export const LoginPage: React.FC = observer(() => {

	const loading = globalState.authState.loading

	return <>
		<div className={"login-form"}>
			<Card sx={{minWidth: 300, padding: '16px'}}>
				<CardHeader
					avatar={
						loading ? (
							<Skeleton animation="wave" variant="circular" width={56} height={56}/>
						) : (
							<Avatar
								alt="Avatar"
								sx={{width: 56, height: 56}}
								src={globalState.authState.userData.avatar}
							/>
						)
					}
					title={
						loading ? (
							<Skeleton
								animation="wave"
								height={10}
								width="80%"
								style={{marginBottom: 6}}
							/>
						) : (
							globalState.authState.userData.name || 'You can log in using your Google account'
						)
					}
					subheader={
						loading ? (
							<Skeleton animation="wave" height={10} width="40%"/>
						) : (
							globalState.authState.lastLogin || 'Click the button below'
						)
					}
				/>
				<CardContent>
					{loading && <Typography variant="body2">Please wait...</Typography>}
				</CardContent>

				{!loading && <CardActions sx={{placeContent: 'center'}}>
					{globalState.authState.isLoggedIn && <>
						<Button
							variant="outlined"
							color="error"
							onClick={() => globalState.authState.setLogoutIntent()}>Logout</Button>

						<Button
							variant="contained"
							onClick={() => globalState.navigationService.navigate(2)}>
							Go to data
							<ArrowForwardRoundedIcon/>
						</Button>
					</>}

					{!globalState.authState.isLoggedIn && <Button
						variant="contained"
						onClick={globalState.authService.loginWithGoogle}>Login with Google</Button>}
				</CardActions>}
			</Card>
		</div>
	</>
})
