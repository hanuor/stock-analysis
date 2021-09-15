import { SelectComparison } from './SelectComparison';

export function CustomChoice() {
	// Dropdown -- Input -- (Input)
	// Operator -- Checkbox
	// Help icon with tips?

	return (
		<div className="border-b border-gray-200 p-1 text-sm">
			<div className="flex items-center space-x-1">
				<div>
					<SelectComparison />
				</div>
				<input
					type="text"
					placeholder="Value"
					tabIndex={0}
					className="shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm block border-gray-300 rounded-sm p-1 max-w-[4rem]"
				/>
				<div>&</div>
				<input
					type="text"
					placeholder="Value"
					tabIndex={0}
					className="shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm block border-gray-300 rounded-sm p-1 max-w-[4rem]"
				/>
			</div>
			<div className="flex">
				<div>{'>'}</div>
				<div>Revenue is greater than X</div>
			</div>
			<div className="flex">
				<div>
					<input type="checkbox" id="equals" />
					<label htmlFor="equals">include equal match</label>
				</div>
			</div>
		</div>
	);
}
