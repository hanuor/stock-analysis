import { Button } from 'components/Button';

export const HoldingsPaywall = ({ total }: { total: number }) => {
	if (total < 200) {
		return null;
	}

	return (
		<div className="border border-gray-200 mt-7 p-6 text-center">
			<h4 className="text-2xl xs:text-3xl font-bold text-gray-900 mb-3">
				Showing 200 of {total} holdings
			</h4>
			<div className="text-xl">Subscribe to see the full list</div>
			<Button
				text="Start Free Trial"
				url="/pro/"
				className="w-44"
				id="free-trial-holdings-below"
			/>
		</div>
	);
};
