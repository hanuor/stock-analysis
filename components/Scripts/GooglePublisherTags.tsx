import Script from 'next/script';

export const GooglePublisherTags = () => {
	return (
		<>
			<Script
				strategy="afterInteractive"
				src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
			/>
		</>
	);
};
