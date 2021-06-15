import Meta from '@/components/Meta';
import Header from '@/components/Layout/Header/_Header';
import Footer from '@/components/Layout/Footer/_Footer';

function LayoutFullWidth(props) {
	return (
		<>
			<Meta title={props.title}></Meta>
			<div className="">
				<Header />
				<main>{props.children}</main>
				<Footer />
			</div>
		</>
	);
}

export default LayoutFullWidth;
