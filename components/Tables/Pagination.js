const Pagination = ({
	previousPage,
	canPreviousPage,
	pageIndex,
	pageOptions,
	pageSize,
	setPageSize,
	nextPage,
	canNextPage,
}) => {
	return (
		<nav className="mt-2 px-1 flex flex-row justify-between space-x-2 text-sm sm:text-base">
			<button
				onClick={() => previousPage()}
				disabled={!canPreviousPage}
				className="relative inline-flex items-center px-1 xs:px-1.5 sm:px-4 py-1.5 xs:py-2 whitespace-nowrap border border-gray-300 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
				{`< Previous`}
			</button>
			<div className="flex flex-row items-center space-x-3 xs:space-x-4">
				<span className="whitespace-nowrap">
					<span className="hidden xs:inline">Page </span>
					{`${pageIndex + 1} of ${pageOptions.length}`}
				</span>
				<select
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}
					name="perpage"
					className="block w-full pl-2 xs:pl-2.5 sm:pl-3 pr-8 xs:pr-9 sm:pr-10 py-1.5 xs:py-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm sm:text-base">
					<option value="200">200</option>
					<option value="500">500</option>
					<option value="1000">1000</option>
					<option value="10000">10000</option>
				</select>
			</div>
			<button
				onClick={() => nextPage()}
				disabled={!canNextPage}
				className="relative inline-flex items-center px-1 xs:px-1.5 sm:px-4 py-1.5 xs:py-2 whitespace-nowrap border border-gray-300 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
				{`Next >`}
			</button>
		</nav>
	);
};

export default Pagination;
