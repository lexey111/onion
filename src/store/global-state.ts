import {UiState} from "./ui-state.ts";
import {action, makeObservable, observable, reaction} from "mobx";
import {NavigationService} from "../services/navigation-service.ts";
import {AuthState} from "./auth-state.ts";
import {AuthService} from "../services/auth-service.ts";
import {CustomersState} from "./customers-state.ts";

export class GlobalState {
	uiState: UiState
	navigationService: NavigationService

	authState: AuthState
	authService: AuthService

	customerState: CustomersState

	runTimer: number

	constructor() {
		// create sub-states
		this.uiState = new UiState()
		this.authState = new AuthState()
		this.customerState = new CustomersState()

		// create services
		this.navigationService = new NavigationService(this.uiState)
		this.authService = new AuthService(this.authState)

		// add reactions to login
		reaction(() => this.authState.isLoggedIn, (value, prev) => {
			console.log('Get login state (reaction)', value, '->', prev)
			this.authState.resetLogoutIntent()

			if (value === false) {
				// even if it locked - force login page
				this.uiState.setLocked(false)
				this.uiState.setNavigationGuard(false)

				this.navigationService.navigateLoginPage()
			}

			if (value === true) {
				this.navigationService.navigateCustomerPage()
			}
		})

		// reaction on navigation to details (set current customer)
		reaction(() => this.customerState.currentCustomerId, (value, prev) => {
			console.log('Get detail state (reaction)', value, '->', prev)

			if (value) {
				// customers -> details
				this.navigationService.navigateDetailsPage()
			} else {
				if (prev) {
					// details -> customers
					this.navigationService.navigateCustomerPage()
				}
			}
		})


		// init own values
		makeObservable(this, {
			runTimer: observable,
			incTimer: action
		})

		this.runTimer = 1

		setInterval(() => this.incTimer(), 1000)
	}

	incTimer() {
		this.runTimer += 1
	}
}

export const globalState = new GlobalState()
