import Script from 'next/script';

export const GooglePublisherTags = () => {
	return (
		<>
			{/* <Script
				strategy="afterInteractive"
				src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
			/>
			<Script
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `if (typeof googletag === 'undefined') { const googletag = (window.googletag = window.googletag || { cmd: [] }); }`,
				}}
			/> */}
		</>
	);
};
