import { ReactNode } from 'react';
import { Info } from 'types/Info';
import StockHeading from 'components/StockHeading/_StockHeading';

interface Props {
	children: ReactNode;
	info: Info;
}

export const Stock = ({ children, info }: Props) => {
	return (
		<>
			<div className="mx-auto pt-5 sm:pt-6 w-full xl:max-w-screen-xl">
				<main id="main">
					<StockHeading info={info} />
					{children}
				</main>
			</div>
		</>
	);
};
