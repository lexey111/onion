import {makeAutoObservable} from "mobx";
import {Customer, CustomerDetailed} from "../services/customers-types.ts";
import {CustomersService} from "../services/customers-service.ts";
import {CustomersDataService} from "../services/customers-data-service.ts";

export class CustomersState {
	customers: Customer[] = []

	currentCustomerId: string = ''

	selectOptions: { id: string, label: string }[] = []

	loading = false

	fetching = false

	details: Record<string, CustomerDetailed> = {}

	protected customersService: CustomersService
	customersDataService: CustomersDataService

	constructor() {
		this.customersService = new CustomersService()
		// service has link to state because service need to update data
		this.customersDataService = new CustomersDataService(this)

		makeAutoObservable(this)
	}

	setCustomerDetails(id: string, data: CustomerDetailed) {
		this.details[id] = data
	}

	setCustomerDetailsField(id: string, fieldName: string, value: string | number) {
		if (!this.details[id]) {
			return
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		this.details[id][fieldName] = value
	}

	setCustomers(data: Customer[]) {
		this.customers = this.customersService.prepareCreatedAt<Customer>(data)
		this.selectOptions = this.customersService.prepareSelect(data)
	}

	setCurrentCustomer(id: string | number) {
		this.currentCustomerId = id.toString()

		if (id) {
			this.customersDataService.loadCustomerData(this.currentCustomerId)
		}
	}

	setLoading(state: boolean) {
		this.loading = state
	}

	setFetching(state: boolean) {
		this.fetching = state
	}
}
