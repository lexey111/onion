import {useCustomers} from "./subsystems/customers/hooks/useCustomers.tsx"
import {globalState} from "./store/global-state.ts"

import 'react-toastify/dist/ReactToastify.css'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import {App} from "./App.tsx";

// Here should be all "local", app-level initializers and providers
// like Hooks or Contexts which should be a singleton

export const AppProviders = () => {
	useCustomers(globalState.customerState)

	return <App/>
}
