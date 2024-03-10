import {Layer} from "./Layer.tsx";
import {ReactNode, useCallback, useMemo} from "react";
import {observer} from "mobx-react-lite";
import {globalState} from "../../store/global-state.ts";

export type Page = {
	title: string | ReactNode
	id: string
	content: ReactNode
}

type LayersProps = {
	layers: Array<Page>
}

export const Layers: React.FC<LayersProps> = observer(({layers}) => {

	const handleGoBack = useCallback(() => {
		globalState.navigationService.navigateBack()
	}, [])

	const activeLayers = useMemo(() => layers.slice(0, globalState.uiState.uiLevel), [layers, globalState.uiState.uiLevel])

	return (<>
		<div className={`layers level-${globalState.uiState.uiLevel}`}>
			{activeLayers.map((page, idx) => <Layer
				level={idx}
				goBack={idx > 0 ? handleGoBack : undefined}
				key={page.id}
				title={page.title}
			>
				{page.content}
			</Layer>)}
		</div>
	</>)
})
