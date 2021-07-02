import Link from 'next/link';

const StockLink = ({ symbol, className }) => {
   const classes = className || 'bll';

   return (
      <Link href={`/stocks/${symbol.toLowerCase()}/`}>
         <a className={classes}>{symbol.toUpperCase()}</a>
      </Link>
   );
};

export default StockLink;

export const ETFLink = ({ symbol, className }) => {
   const classes = className || 'bll';

   return (
      <Link href={`/etf/${symbol.toLowerCase()}/`}>
         <a className={classes}>{symbol.toUpperCase()}</a>
      </Link>
   );
};

export const SymbolLink = ({ symbol, className }) => {
   if (symbol.startsWith('$')) {
      return <StockLink symbol={symbol.slice(1)} className={className} />;
   } else if (symbol.startsWith('#')) {
      return <ETFLink symbol={symbol.slice(1)} className={className} />;
   }

   return symbol.toUpperCase();
};
