import {Customer} from "./customers-types.ts";

export class CustomersService {
	// Transforms created_at from ISO to human-readable
	prepareCreatedAt<T extends Customer>(rows: T[]): T[] {
		return rows.map(c => {
			const createdAt = new Intl.DateTimeFormat('en-US', {
				dateStyle: 'full',
				timeStyle: 'long',
			})
				.format(new Date(c.created_at))

			return {...c, created_at: createdAt}
		})
	}

	prepareSelect(rows: Customer[]) {
		return rows.map(c => {
			return {
				id: c.id.toString(),
				label: c.name
			}
		})
	}
}
