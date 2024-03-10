import {makeAutoObservable} from "mobx"

export type UiLevel = -1 | 1 | 2 | 3

export const uiLevelLoginPage: UiLevel = 1
export const uiLevelCustomerPage: UiLevel = 2
export const uiLevelDetailsPage: UiLevel = 3

export class UiState {
	uiLevel: UiLevel = 1
	navigationGuardRequest = false
	locked = false

	constructor() {
		makeAutoObservable(this)
	}

	resetLevel() {
		this.uiLevel = 1
	}

	setLevel(level: UiLevel) {
		this.uiLevel = level
	}

	setNavigationGuard(state: boolean) {
		this.navigationGuardRequest = state
	}

	setLocked(state: boolean) {
		this.locked = state
	}

	decreaseLevel() {
		if (this.uiLevel > 1) {
			this.uiLevel--
		}
	}
}
