import {SupabaseClient} from "@supabase/supabase-js";
import {CustomerDetailed} from "../../../services/customers-types.ts";

export async function updateCustomer(
	client: SupabaseClient,
	data: CustomerDetailed
) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {created_at, id, ...rest} = data;

	if (data.id === 0 || data.id === -1) {
		(rest as Partial<CustomerDetailed>).created_at = new Date();
	} else {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		rest.id = data.id;
	}

	return client
		.from('customers')
		.upsert({...rest})
		.throwOnError();
}
