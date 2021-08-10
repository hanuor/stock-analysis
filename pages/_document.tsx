import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					{/* <script
						async
						src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
					></script>
					<script
						dangerouslySetInnerHTML={{
							__html: `const googletag = (window.googletag = window.googletag || { cmd: [] });`,
						}}
					/> */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
