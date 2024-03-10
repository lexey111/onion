import {useMemo} from 'react'
import {getSupabaseClient} from "./db.ts"

function useSupabase() {
	return useMemo(getSupabaseClient, [])
}

export default useSupabase
