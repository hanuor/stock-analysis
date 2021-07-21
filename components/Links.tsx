import Link from 'next/link';

interface ILinks {
	symbol: string;
	className?: string;
	prefetch?: boolean;
}

export const StockLink = ({ symbol, className, prefetch = false }: ILinks) => {
	const classes = className || 'bll';

	return (
		<Link href={`/stocks/${symbol.toLowerCase()}/`} prefetch={prefetch}>
			<a className={classes}>{symbol.toUpperCase()}</a>
		</Link>
	);
};

export const ETFLink = ({ symbol, className, prefetch = false }: ILinks) => {
	const classes = className || 'bll';

	return (
		<Link href={`/etf/${symbol.toLowerCase()}/`} prefetch={prefetch}>
			<a className={classes}>{symbol.toUpperCase()}</a>
		</Link>
	);
};

export const SymbolLink = ({ symbol, className, prefetch = false }: ILinks) => {
	if (symbol.startsWith('$')) {
		return (
			<StockLink
				symbol={symbol.slice(1)}
				className={className}
				prefetch={prefetch}
			/>
		);
	} else if (symbol.startsWith('#')) {
		return (
			<ETFLink
				symbol={symbol.slice(1)}
				className={className}
				prefetch={prefetch}
			/>
		);
	} else {
		return <>{symbol.toUpperCase()}</>;
	}
};
