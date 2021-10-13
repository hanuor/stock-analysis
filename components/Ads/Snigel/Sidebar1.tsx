import { authState } from 'state/authState';

export function Sidebar1() {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	if (
		!status ||
		status !== 'completed' ||
		(status === 'completed' && !isPro)
	) {
		return (
			<div className="min-h-[250px] hidden lg:block">
				<div id="adngin-sidebar_1-0"></div>
			</div>
		);
	}

	return null;
}
