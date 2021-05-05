import Head from "next/head";

function Meta(props) {
	return (
		<Head>
			<title>{props.title}</title>
		</Head>
	);
}

export default Meta;