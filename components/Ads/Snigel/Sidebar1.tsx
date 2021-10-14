import { authState } from 'state/authState';

export function Sidebar1() {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	if (status !== 'completed' || (status === 'completed' && !isPro)) {
		return (
			<div className="hidden lg:block lg:min-h-[295px] mx-auto">
				<div id="adngin-sidebar_1-0"></div>
			</div>
		);
	}

	return null;
}
