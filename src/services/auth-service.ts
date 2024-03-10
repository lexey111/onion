import {AuthState} from "../store/auth-state.ts";
import {queryClient} from "../db/query-client.ts";
import {supabase} from "../db/db.ts";

export const authQueryKey = ['auth']

export class AuthService {
	protected query
	private authState: AuthState

	constructor(authState: AuthState) {
		this.authState = authState

		void this.init()

		this.query = queryClient
			.fetchQuery(authQueryKey, async () => {

				try {
					console.log('Fetch user...')
					const {error, data} = await supabase.auth.getUser()
					if (error) {
						throw new Error(error.message)
					}

					console.log('Data', data)
					this.authState.setUser({
						id: data?.user?.id,
						name: data?.user?.email,
						provider: data?.user?.app_metadata?.provider,
						lastLogin: data?.user?.last_sign_in_at,
						avatar: data?.user?.user_metadata?.avatar_url
					})
				} catch (err) {
					console.log('Error', err)
					this.authState.resetUser()
				}
				this.authState.setNotLoading()
			})
	}

	loginWithGoogle = async () => {
		console.log('Login with Google')
		this.authState.setLoading()

		setTimeout(this.doLoginWithGoogle, 200)
	}

	logout = async () => {
		console.log('Logout!')

		this.authState.setLoading()
		this.authState.resetLogoutIntent()

		setTimeout(this.doLogout, 200)
	}

	protected doLoginWithGoogle = async () => {
		await queryClient.cancelQueries({queryKey: authQueryKey})
		await supabase.auth.signInWithOAuth({provider: 'google'})
	}

	protected doLogout = async () => {
		await queryClient.cancelQueries({queryKey: authQueryKey})
		await supabase.auth.signOut();

		this.init()
	}

	private async init() {
		console.log('Login init')
		this.authState.setLoading()

		await queryClient.invalidateQueries({queryKey: authQueryKey});
		await queryClient.refetchQueries({queryKey: authQueryKey});
	}
}
