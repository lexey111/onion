import {createTheme} from '@mui/material/styles';

export const theme = createTheme({

	palette: {
		mode: 'light',
		primary: {
			main: '#ffb91f',
			contrastText: 'rgba(255,255,255,0.87)',
			dark: '#e2a41b',
		},
		secondary: {
			main: '#1de9b6',
			dark: '#1ad4a5',
		},
		error: {
			main: '#f50057',
		},
		warning: {
			main: '#ffc400',
		},
		info: {
			main: '#00acc1',
		},
		success: {
			main: '#7cb342',
		},
	},
	shape: {
		borderRadius: 4,
	},
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiInput: {
		},
	},
})
