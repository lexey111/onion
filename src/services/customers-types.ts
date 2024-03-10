export type Customer = {
	id: number
	created_at: number
	name: string
}

export type CustomerDetailed = {
	id: number
	created_at: Date
	name: string
	description: string
	location: string
	expenses: number
	calls: number
}

export const NoCustomer: CustomerDetailed = {
	id: 0,
	created_at: new Date(),
	name: '',
	description: '',
	location: '',
	expenses: 0,
	calls: 0
}
