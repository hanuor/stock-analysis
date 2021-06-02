export default function Select(props) {
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
				<option value="day">Day</option>
				<option value="month">Month</option>
				<option value="year">Year</option>
			</select>
		</div>
	);
}
