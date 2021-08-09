import { authState } from 'state/authState';
import Script from 'next/script';

export const Sidebar1 = () => {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	return (
		<>
			{status === 'completed' && !isPro && (
				<>
					<div id="div-gpt-ad-1617185412139-0"></div>
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
