import {getCustomer} from "../subsystems/customers/queries/get-customer-query.ts"
import {queryClient} from "../db/query-client.ts"
import {getSupabaseClient} from "../db/db.ts"
import {CustomersState} from "../store/customers-state.ts"
import {CustomerDetailed} from "./customers-types.ts"
import {updateCustomer} from "../subsystems/customers/queries/update-customer.ts"
import {toast} from "react-toastify"
import {deleteCustomer} from "../subsystems/customers/queries/delete-customer.ts"
import {customersKey} from "../subsystems/customers/hooks/useCustomers.tsx"
import {subscribe} from "./subscribe-service.ts"
import {globalState} from "../store/global-state.ts";

export class CustomersDataService {
	protected client

	protected queries: Record<string, any> = {}

	protected state: CustomersState

	constructor(state: CustomersState) {
		this.client = queryClient
		this.state = state

		subscribe('customers.refresh', this.checkState)
	}

	createQuery(id: string) {
		this.queries[id] = async () => {
			return getCustomer(getSupabaseClient(), id)
				.then(
					(result: any) => {
						console.log('[Details] for id', id, result)
						this.state.setCustomerDetails(id, result?.data?.[0])
					}
				)
		}
	}

	async loadCustomerData(id: string) {
		if (!this.queries[id]) {
			this.createQuery(id)
		}

		if (id !== 'new') {
			await this.client.cancelQueries(['customers/id', id])
			await this.client.invalidateQueries(['customers/id', id])
			await this.client.fetchQuery(['customers/id', id], this.queries[id])
		}
	}

	async saveCustomerData(data: CustomerDetailed) {
		try {
			await updateCustomer(getSupabaseClient(), data)

			if (data.id.toString() !== 'new' && data.id !== 0) {
				await this.client.invalidateQueries(['customers/id', data.id])
				await this.client.cancelQueries(['customers/id', data.id])
				await this.client.fetchQuery(['customers/id', data.id], this.queries[data.id])
			}

		} catch (e) {
			console.log(e)
			toast.error('Error on saving customer')
		}
	}

	async deleteCustomer(id: string) {
		try {
			await deleteCustomer(getSupabaseClient(), id)
			this.queries[id] = null

			await this.client.invalidateQueries(['customers/id', id])
			await this.client.cancelQueries(['customers/id', id])

			await this.client.invalidateQueries(customersKey)
		} catch (e) {
			console.log(e)
			toast.error('Error on deleting customer')
		}
	}

	protected checkState = () => {
		console.log('Received Refresh event, checking the state...')
		if (this.state.currentCustomerId && this.state.currentCustomerId !== 'new') {
			// check is the id still exists
			const current = this.state.customers.find(c => c.id.toString() === this.state.currentCustomerId)
			if (!current) {
				toast.error('Customer was deleted')
				// bad practice, should be an API or eventß
				globalState.navigationService.resetHasChanges()
				this.state.setCurrentCustomer('')
			}
		}
	}
}
