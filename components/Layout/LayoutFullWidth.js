import Meta from 'components/Meta';

function LayoutFullWidth(props) {
	return (
		<>
			<Meta title={props.title}></Meta>
			<div className="">
				<main>{props.children}</main>
			</div>
		</>
	);
}

export default LayoutFullWidth;
