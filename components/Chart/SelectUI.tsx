import { Dispatch, SetStateAction } from 'react';

interface ButtonUIProps {
	state: string;
	dispatch: Dispatch<SetStateAction<string>>;
}

interface SelectProps {
	dispatcher: Dispatch<SetStateAction<string>>;
}

export const SelectPeriod = (props: SelectProps) => {
	return (
		<div>
			<select
				onChange={(e) => {
					props.dispatcher(e.target.value);
				}}
				id="period"
				name="period"
				className="block pl-2  tiny:pl-3 sm:border-l border-r border-gray-300 pr-7 bpm:pr-8 bp:pr-10 py-2 border-0 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs bpm:text-base"
				defaultValue="Day"
			>
				<option value="d">Day</option>
				<option value="w">Week</option>
				<option value="m">Month</option>
			</select>
		</div>
	);
};

export const SelectType = (props: SelectProps) => {
	return (
		<div>
			<select
				onChange={(e) => props.dispatcher(e.target.value)}
				id="type"
				name="type"
				className="block pl-2 tiny:pl-3  border-gray-300 pr-7 bpm:pr-8 bp:pr-10 py-2 sm:border-l  border-r  border-0 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs bpm:text-base"
				defaultValue="Day"
			>
				<option value="candlestick">Candles</option>
				<option value="line">Line</option>
			</select>
		</div>
	);
};

export const Buttons = ({ state, dispatch }: ButtonUIProps) => {
	const common = 'py-0.5 px-0.5 xs:px-[3px] bp:px-1.5 sm:px-3 rounded-md';
	const active = common + ' bp:bg-gray-100 text-gray-800 font-semibold';
	const inactive =
		common + ' text-gray-900 hover:text-gray-900 hover:text-shadow';
	return (
		<>
			<select
				onChange={(e) => dispatch(e.target.value)}
				id="range"
				name="range"
				className="block ml:hidden pl-2 tiny:pl-3 border-r border-gray-300 pr-7 bpm:pr-8 bp:pr-10 py-2 border-0 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs bpm:text-base"
				defaultValue="1Y"
			>
				<option value="1M">1 Month</option>
				<option value="6M">6 Months</option>
				<option value="YTD">YTD</option>
				<option value="1Y">1 Year</option>
				<option value="3Y">3 Years</option>
				<option value="5Y">5 Years</option>
				<option value="MAX">MAX</option>
			</select>

			<ul className="hidden ml:flex flex-row whitespace-nowrap overflow-x-auto pl-1">
				<li>
					<button
						onClick={() => {
							dispatch('1M');
						}}
						type="button"
						className={state === '1M' ? active : inactive}
					>
						1 Month
					</button>
				</li>
				<li>
					<button
						onClick={() => {
							dispatch('6M');
						}}
						type="button"
						className={state === '6M' ? active : inactive}
					>
						6 Months
					</button>
				</li>

				<li>
					<button
						onClick={() => {
							dispatch('YTD');
						}}
						type="button"
						className={state === 'YTD' ? active : inactive}
					>
						YTD
					</button>
				</li>
				<li>
					<button
						onClick={() => {
							dispatch('1Y');
						}}
						type="button"
						className={state === '1Y' ? active : inactive}
					>
						1 Year
					</button>
				</li>
				<li>
					<button
						onClick={() => {
							dispatch('3Y');
						}}
						type="button"
						className={state === '3Y' ? active : inactive}
					>
						3 Years
					</button>
				</li>
				<li>
					<button
						onClick={() => {
							dispatch('5Y');
						}}
						type="button"
						className={state === '5Y' ? active : inactive}
					>
						5 Years
					</button>
				</li>
				<li>
					<button
						onClick={() => {
							dispatch('MAX');
						}}
						type="button"
						className={state === 'MAX' ? active : inactive}
					>
						MAX
					</button>
				</li>
			</ul>
		</>
	);
};
