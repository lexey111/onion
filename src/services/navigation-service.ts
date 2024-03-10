import {UiLevel, uiLevelCustomerPage, uiLevelDetailsPage, uiLevelLoginPage, UiState} from "../store/ui-state.ts";

export class NavigationService {
	public navigationIntent: UiLevel = -1
	private uiState: UiState

	constructor(uiState: UiState) {
		this.uiState = uiState
	}

	navigateLoginPage = () => {
		this.navigate(uiLevelLoginPage)
	}

	navigateCustomerPage = () => {
		this.navigate(uiLevelCustomerPage)
	}

	navigateDetailsPage = () => {
		this.navigate(uiLevelDetailsPage)
	}

	resetHasChanges = () => {
		this.uiState.setLocked(false)
	}

	resetIntent = () => {
		this.uiState.setNavigationGuard(false)
	}

	setHasChanges = () => {
		this.uiState.setLocked(true)
	}

	setIntent = (level: UiLevel) => {
		this.navigationIntent = level
	}

	navigate = (level: UiLevel) => {
		if (!this.uiState.navigationGuardRequest && !this.uiState.locked) {
			this.uiState.setLevel(level)
			return
		}

		this.setIntent(level)
		this.uiState.setNavigationGuard(true)
	}

	confirmIntent = () => {
		this.uiState.setNavigationGuard(false)
		this.uiState.setLocked(false)
		if (this.navigationIntent === -1) {
			return
		}
		this.uiState.setLevel(this.navigationIntent)
	}

	navigateBack = () => {
		if (this.uiState.uiLevel > 1) {
			this.navigate(this.uiState.uiLevel - 1 as UiLevel)
		}
	}

}
