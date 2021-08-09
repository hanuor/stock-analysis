import { authState } from 'state/authState';
import { navState } from 'state/navState';

import Script from 'next/script';

export const Sidebar1 = () => {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);
	const path = navState((state) => state.path);

	if (!path.one || path.one !== 'stocks') {
		return null;
	}

	return (
		<>
			{status === 'completed' && !isPro && (
				<>
					<div className="lbl mt-4 mb-1">
						<div
							className="min-h-[250px] w-[300px] bg-gray-50 mx-auto"
							id="div-gpt-ad-1617185412139-0"
						></div>
					</div>
					<Script
						strategy="lazyOnload"
						dangerouslySetInnerHTML={{
							__html: `console.log('before script');googletag.cmd.push(function() { googletag.display("div-gpt-ad-1617185412139-0"); });console.log('after script');`,
						}}
					/>
				</>
			)}
		</>
	);
};
