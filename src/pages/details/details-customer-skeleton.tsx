import {Skeleton} from "@mui/material"
import React from "react"
import {StyledControl} from "./details-customer-form.tsx"

export const DetailsPageCustomerSkeleton: React.FC = () => {
	return (<>
			<StyledControl>
				<Skeleton animation="wave" height={40} width="100%"/>
			</StyledControl>
			<StyledControl>
				<Skeleton animation="wave" height={40} width="100%"/>
			</StyledControl>
			<StyledControl>
				<Skeleton animation="wave" height={40} width="100%"/>
			</StyledControl>
			<StyledControl>
				<Skeleton animation="wave" height={40} width="100%"/>
			</StyledControl>
			<StyledControl>
				<Skeleton animation="wave" height={40} width="100%"/>
			</StyledControl>
		</>
	)
}
