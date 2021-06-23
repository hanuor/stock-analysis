export function SelectPeriod(props) {
	return (
		<div>
			<label
				htmlFor="location"
				className="block text-sm font-medium text-gray-700"></label>
			<select
				onChange={(e) =>
					props.dispatcher({
						type: "periodChange",
						value: e.target.value,
					})
				}
				id="period"
				name="period"
				className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
				defaultValue="Day">
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
			<label
				htmlFor="location"
				className="block text-sm font-medium text-gray-700"></label>
			<select
				onChange={(e) =>
					props.dispatcher({
						type: "changeType",
						value: e.target.value,
					})
				}
				id="period"
				name="period"
				className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
				defaultValue="Day">
				<option value="candlestick">Candlestick</option>
				<option value="line">Line</option>
			</select>
		</div>
	);
}
