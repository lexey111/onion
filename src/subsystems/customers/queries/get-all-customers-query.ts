import {SupabaseClient} from "@supabase/supabase-js";

export function getAllCustomers(
	client: SupabaseClient,
) {
	return client
		.from('customers')
		.select('id, created_at, name')
		.order('name')
		.throwOnError();
}
