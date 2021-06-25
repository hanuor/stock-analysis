import Stock from "@/components/Layout/StockLayout";
import StockChart from "@/components/Chart/StockChart";
import { SelectPeriod, SelectType } from "@/components/Chart/SelectUI";
import Buttons from "@/components/Chart/ButtonsUI";
import { useImmerReducer } from "use-immer";
import { getPageData, getStockInfo } from '@/Functions/callBackEnd';
import { stockState } from "@State/stockState";
import { useEffect } from "react";
import React from "react";


export default function CandleStickStockChart(props) {
	if (!props.info) {
		return <h1>Loading...</h1>;
	}

	const initialState = {
		period: "d",
		time: "1Y",
		type: "candlestick",
		loading: false,
	};

	function ourReducer(draft, action) {
		switch (action.type) {
			case "periodChange":
				draft.period = action.value;
				draft.loading = true;
				console.log(action.value);
				return;
			case "timeChange":
				draft.time = action.value;
				draft.loading = true;
				console.log(action.value);
				return;
			case "changeLoading":
				draft.loading = action.value;
				return;
			case "changeType":
				draft.type = action.value;
				return;
		}
	}

	const [state, dispatch] = useImmerReducer(ourReducer, initialState);

	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);

	useEffect(() => {
		setInfo(info);
		setData(data);
	}, [data, info, setData, setInfo]);

	if (!info) {
		return null;
	}

	return (
		<Stock>
			<h2 className="text-2xl font-bold my-8">
				<div>
					<div>
						<SelectType dispatcher={dispatch} />
						<SelectPeriod dispatcher={dispatch} />
						<Buttons dispatcher={dispatch} />
					</div>
					<StockChart
						loading={state.loading}
						stockId={props.info.id}
						period={state.period}
						time={state.time}
						type={state.type}
						dispatcher={dispatch}
					/>
				</div>
			</h2>
		</Stock>
	);
}

export async function getStaticPaths() {
	return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
	const info = await getStockInfo({ params });
	const data = await getPageData(info.id, 'overview');

	return {
		props: {
			info,
			data,
		},
	};
}
