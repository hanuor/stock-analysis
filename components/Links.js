import Link from 'next/link';

const StockLink = ({ symbol }) => {
	return (
		<Link href={`/stocks/${symbol.toLowerCase()}/`}>
			<a className="bll">{symbol.toUpperCase()}</a>
		</Link>
	);
};

export default StockLink;
