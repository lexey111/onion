import {SupabaseClient} from "@supabase/supabase-js";

export function getCustomer(
	client: SupabaseClient,
	id: string
) {
	return client
		.from('customers')
		.select('*')
		.eq('id', id)
		.throwOnError();
}
