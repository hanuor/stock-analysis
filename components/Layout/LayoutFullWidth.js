import Meta from '@/components/Meta';
import Header from '@/Layout/Header';
import Footer from '@/Layout/Footer';

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
