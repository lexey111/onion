import {Layers} from "./components/layers/Layers.tsx"
import {Header} from "./components/header.tsx"
import {Counter} from "./components/counter.tsx"
import {NavigationGuard} from "./components/navigation-guard.tsx"
import {DetailsPage} from "./pages/details-page.tsx"
import {LoginPage} from "./pages/login-page.tsx"
import {LogoutIntentGuard} from "./components/logout-intent-guard.tsx"
import {CustomersPage} from "./pages/customers-page.tsx"
import {ToastContainer} from "react-toastify"

import 'react-toastify/dist/ReactToastify.css'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import {observer} from "mobx-react-lite";
import {globalState} from "./store/global-state.ts";

export const App = observer(() => {
	return (<>
			<div className="app-container">
				<Header/>
				<Counter/>
				<Layers layers={[
					{
						id: 'layer_login',
						title: globalState.authState.loading
							? 'Please wait...'
							: globalState.authState.isLoggedIn
								? 'Profile'
								: 'Login',
						content: <LoginPage/>
					},
					{id: 'layer_customers', title: 'Customers', content: <CustomersPage/>},

					{id: 'layer_contacts', title: 'Details', content: <DetailsPage/>},

				]}/>
			</div>

			<NavigationGuard/>

			<LogoutIntentGuard/>

			<ToastContainer
				position="bottom-center"
				hideProgressBar={true}
				closeOnClick
				autoClose={2000}
				pauseOnHover
				theme="dark"
				closeButton={<></>}/>
		</>
	)
})
