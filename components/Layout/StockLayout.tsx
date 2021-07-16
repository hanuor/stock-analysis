import { ReactNode } from 'react';
import StockHeading from 'components/StockHeading/_StockHeading';

interface Props {
	children: ReactNode;
	type: string;
	id: number;
}

export const Stock = ({ children, type, id }: Props) => {
	return (
		<>
			<div className="mx-auto pt-5 pb-10 sm:pt-6 w-full xl:max-w-screen-xl">
				<main>
					<StockHeading type={type} id={id} />
					{children}
				</main>
			</div>
		</>
	);
};
