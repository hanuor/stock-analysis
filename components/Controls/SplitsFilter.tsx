interface Props {
	setColumnFilter: (columId: string, updater: any) => void;
}

export function SplitsFilter({ setColumnFilter }: Props) {
	return (
		<div className="min-w-[80px] max-w-[120px] xs:max-w-[130px] sm:max-w-[150px]">
			<span>
				<select
					id="period"
					name="period"
					className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 bp:px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
					defaultValue="All Types"
					onChange={(e) => {
						setColumnFilter('splitType', e.target.value);
						// setValue(e.target.value);
					}}
				>
					<option value="">All Types</option>
					<option value="Reverse">Reverse</option>
					<option value="Forward">Forward</option>
				</select>
			</span>
		</div>
	);
}
