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
			<div className="mx-auto pt-5 pb-10 sm:pt-6 w-full xl:max-w-screen-xl">
				<main>
					<StockHeading info={info} />
					{children}
				</main>
			</div>
		</>
	);
};
