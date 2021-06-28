import Stock from '@/components/Layout/StockLayout';
import StockChart from '@/components/Chart/StockChart';
import { SelectPeriod, SelectType } from '@/components/Chart/SelectUI';
import Buttons from '@/components/Chart/ButtonsUI';
import { useImmerReducer } from 'use-immer';
import { getStockInfo } from '@/Functions/callBackEnd';
import { stockState } from '@State/stockState';
import { useEffect } from 'react';
import React from 'react';

export default function CandleStickStockChart({ info, data }) {
	const initialState = {
		period: 'd',
		time: '1Y',
		type: 'candlestick',
		loading: false,
	};

	function ourReducer(draft, action) {
		switch (action.type) {
			case 'periodChange':
				draft.period = action.value;

				return;
			case 'timeChange':
				draft.time = action.value;

				return;
			case 'changeLoading':
				draft.loading = action.value;
				return;
			case 'changeType':
				draft.type = action.value;
				return;
		}
	}

	const [state, dispatch] = useImmerReducer(ourReducer, initialState);

	const setInfo = stockState((state) => state.setInfo);

	useEffect(() => {
		setInfo(info);
	}, [info, setInfo]);

	if (!info) {
		return null;
	}

	return (
		<Stock>
			<div className="px-2 sm:contain">
				<div className="">
					<div className="flex flex-row justify-between items-center border border-gray-200 mb-3 text-sm bp:text-base">
						<Buttons dispatcher={dispatch} />
						<SelectPeriod dispatcher={dispatch} />
						<SelectType dispatcher={dispatch} />
					</div>
					<div className="max-h-[500px] bp:max-h-[550px] sm:max-h-[600px]">
						<StockChart
							loading={state.loading}
							stockId={info.id}
							period={state.period}
							time={state.time}
							type={state.type}
							dispatcher={dispatch}
						/>
					</div>
				</div>
			</div>
		</Stock>
	);
}

export async function getStaticPaths() {
	return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
	const info = await getStockInfo({ params });

	return {
		props: {
			info,
		},
		revalidate: 300,
	};
}
