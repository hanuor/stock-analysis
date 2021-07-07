export function SelectPeriod(props) {
	return (
		<div>
			<select
				onChange={(e) =>
					props.dispatcher({
						type: 'periodChange',
						value: e.target.value,
					})
				}
				id="period"
				name="period"
				className="block pl-3 sm:border-l border-r border-gray-300 pr-8 bp:pr-10 py-2 border-0 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bp:text-base"
				defaultValue="Day"
			>
				<option value="d">Day</option>
				<option value="w">Week</option>
				<option value="m">Month</option>
			</select>
		</div>
	);
}

export function SelectType(props) {
	return (
		<div>
			<select
				onChange={(e) =>
					props.dispatcher({
						type: 'changeType',
						value: e.target.value,
					})
				}
				id="period"
				name="period"
				className="block pl-3 sm:border-l border-gray-300 pr-8 bp:pr-10 py-2 border-0 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bp:text-base"
				defaultValue="Day"
			>
				<option value="candlestick">Candles</option>
				<option value="line">Line</option>
			</select>
		</div>
	);
}
