import useSupabase from "../../../db/useSupabase.tsx"
import {getAllCustomers} from "../queries/get-all-customers-query.ts"
import {useQuery} from "react-query"
import {Customer} from "../../../services/customers-types.ts"
import {useEffect} from "react"
import {supabase} from "../../../db/db.ts"
import {queryClient} from "../../../db/query-client.ts"
import {toast} from "react-toastify"
import {CustomersState} from "../../../store/customers-state.ts"
import {publish} from "../../../services/subscribe-service.ts"

export const customersKey = ['customers']

export const useCustomers = (state: CustomersState) => {

	const client = useSupabase();

	const queryFn = async () => {
		state.setFetching(true)

		return getAllCustomers(client)
			.then(
				(result: any) => {
					state.setFetching(false)
					state.setCustomers(result?.data || [])
					publish('customers.refresh')

					return result?.data || []
				}
			)
	}

	useEffect(() => {
		const taskListener = supabase
			.channel('public:customers')
			.on(
				'postgres_changes',
				{event: '*', schema: 'public', table: 'customers'},
				async () => {
					toast.info('Updating Customers...')

					await queryClient.cancelQueries({queryKey: customersKey})
					await queryClient.invalidateQueries({queryKey: customersKey})
				}
			)
			.subscribe()

		return () => void taskListener.unsubscribe()
	}, [])


	return useQuery<Customer[]>({
		queryKey: customersKey,
		queryFn,
		// staleTime: 0,
		// refetchOnMount: 'always'
	})
}
