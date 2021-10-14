import { authState } from 'state/authState';

export function Sidebar2() {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	if (status !== 'completed' || (status === 'completed' && !isPro)) {
		return (
			<div className="hidden lg:block mx-auto">
				<div id="adngin-sidebar_2-0"></div>
			</div>
		);
	}

	return null;
}
