import {observer} from "mobx-react-lite";
import {globalState} from "../store/global-state.ts";

export const Counter: React.FC = observer(() => (
	<div className="app-counter">
		App run for {new Date(globalState.runTimer * 1000).toISOString().slice(11, 19)}s
	</div>))
