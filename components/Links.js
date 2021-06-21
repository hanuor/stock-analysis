import Link from 'next/link';

const StockLink = ({ symbol }) => {
	return (
		<Link href={`/stocks/${symbol.toLowerCase()}/`}>
			<a className="bll">{symbol.toUpperCase()}</a>
		</Link>
	);
};

export default StockLink;

export const ETFLink = ({ symbol }) => {
	return (
		<Link href={`/etf/${symbol.toLowerCase()}/`}>
			<a className="bll">{symbol.toUpperCase()}</a>
		</Link>
	);
};
