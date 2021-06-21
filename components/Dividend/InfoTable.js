const InfoTable = ({ data }) => {
	return (
		<div className="px-1 sm:px-4 mt-6 bp:mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 text-base bp:text-lg sm:text-xl">
			<div>
				Dividend Yield
				<div className="font-semibold mt-0.5 sm:mt-1.5 text-lg bp:text-xl sm:text-2xl">
					{data.yield}
				</div>
			</div>
			<div>
				Annual Dividend
				<div className="font-semibold mt-0.5 sm:mt-1.5 text-lg bp:text-xl sm:text-2xl">
					{data.annual}
				</div>
			</div>
			<div>
				Ex-Dividend Date
				<div className="font-semibold mt-0.5 sm:mt-1.5 text-lg bp:text-xl sm:text-2xl">
					{data.exdiv}
				</div>
			</div>
			<div>
				Payout Frequency
				<div className="font-semibold mt-0.5 sm:mt-1.5 text-lg bp:text-xl sm:text-2xl">
					{data.frequency}
				</div>
			</div>
			<div>
				Payout Ratio
				<div className="font-semibold mt-0.5 sm:mt-1.5 text-lg bp:text-xl sm:text-2xl">
					{data.payoutRatio}
				</div>
			</div>
			<div>
				Dividend Growth<span className="hidden bp:visible"> (1Y)</span>
				<div className="font-semibold mt-0.5 sm:mt-1.5 text-lg bp:text-xl sm:text-2xl">
					{data.growth}
				</div>
			</div>
		</div>
	);
};

export default InfoTable;
