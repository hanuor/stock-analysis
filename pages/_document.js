import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	/* static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	} */

	render() {
		return (
			<Html>
				<Head>
					<link
						rel="stylesheet"
						href="https://rsms.me/inter/inter.css"></link>
					{/* <link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
						rel="stylesheet"
					/> */}
					{/* <link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,500&display=swap"
						rel="stylesheet"
					/> */}
					{/* <link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
						rel="stylesheet"
					/> */}
					{/* <link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap"
						rel="stylesheet"
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
