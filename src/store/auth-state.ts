import {makeAutoObservable, reaction} from "mobx";
import {noUserData, User} from "../services/auth-types.ts";

export class AuthState {
	userData: User = {...noUserData}
	loading = false

	// derivatives - formatted string for the last logged in timestamp
	// and logoutIntent to display logout confirmation dialog
	lastLogin: string = ''
	logoutIntent = false

	constructor() {
		makeAutoObservable(this)

		reaction(() => this.userData?.lastLogin, (value) => {
			console.log('Get last login (reaction)', value)
			if (value) {
				this.setLastLogin(new Intl.DateTimeFormat('en-US', {
					dateStyle: 'full',
					timeStyle: 'long',
					timeZone: 'Israel',
				})
					.format(new Date(value)))
			} else {
				this.setLastLogin('')
			}
		})
	}

	get isLoggedIn() {
		return !!this.userData.id
	}

	setLastLogin(loginStr: string) {
		this.lastLogin = loginStr
	}

	setLogoutIntent() {
		this.logoutIntent = true
	}

	resetLogoutIntent() {
		this.logoutIntent = false
	}

	setLoading() {
		this.loading = true
	}

	setNotLoading() {
		this.loading = false
	}

	setUser(data: User) {
		this.userData = {...data}
	}

	resetUser() {
		this.userData = {...noUserData}
	}
}
