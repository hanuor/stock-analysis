import { authState } from 'state/authState';

export const Sidebar1 = () => {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	return (
		<>
			{status === 'completed' && !isPro && (
				<div
					dangerouslySetInnerHTML={{
						__html: `<!-- /2507246/SAN//stockanalysis//misc//1 --><div id="div-gpt-ad-1617185412139-0"><script>googletag.cmd.push(function() { googletag.display("div-gpt-ad-1617185412139-0"); });</script></div>`,
					}}
				></div>
			)}
		</>
	);
};
