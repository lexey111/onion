import 'react-toastify/dist/ReactToastify.css'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"

import {queryClient} from "./db/query-client.ts";
import {QueryClientProvider} from "react-query";
import {AppProviders} from "./AppProviders.tsx";
import {ThemeProvider} from "@mui/material";
import {theme} from "./Theme.ts";

// Here should be all "global" providers
// like Theme, Routes or QueryClient

export const GlobalProviders = () => {
	return <QueryClientProvider client={queryClient}>
		<ThemeProvider theme={theme}>
			<AppProviders/>
		</ThemeProvider>
	</QueryClientProvider>
}
