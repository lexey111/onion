import {SupabaseClient} from "@supabase/supabase-js";

export async function deleteCustomer(
	client: SupabaseClient,
	id: number | string
) {
	return client
		.from('customers')
		.delete()
		.eq('id', id.toString())
		.throwOnError();
}
