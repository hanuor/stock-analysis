/* This example requires Tailwind CSS v2.0+ */
export default function Buttons(props) {
	return (
		<span className="relative z-0 inline-flex shadow-sm rounded-md">
			<button
				onClick={() =>
					props.dispatcher({ type: "timeChange", value: "1 Month" })
				}
				type="button"
				className="relative inline-flex items-center px-4 py-2 rounded-l-md
				border border-gray-300 bg-white text-sm font-medium text-gray-700
				hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1
				focus:ring-indigo-500 focus:border-indigo-500">
				1 Month
			</button>
			<button
				onClick={() =>
					props.dispatcher({ type: "timeChange", value: "6 Months" })
				}
				type="button"
				className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
				6 Months
			</button>
			<button
				onClick={() =>
					props.dispatcher({ type: "timeChange", value: "YTD" })
				}
				type="button"
				className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
				YTD
			</button>
			<button
				onClick={() =>
					props.dispatcher({ type: "timeChange", value: "1 Year" })
				}
				type="button"
				className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
				1 Year
			</button>
			<button
				onClick={() =>
					props.dispatcher({ type: "timeChange", value: "3 Years" })
				}
				type="button"
				className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
				3 Years
			</button>
			<button
				onClick={() =>
					props.dispatcher({ type: "timeChange", value: "5 Years" })
				}
				type="button"
				className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
				5 Years
			</button>
			<button
				onClick={() =>
					props.dispatcher({ type: "timeChange", value: "MAX" })
				}
				type="button"
				className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
				MAX
			</button>
		</span>
	);
}
