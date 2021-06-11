import Stock from "@/components/Layout/StockLayout";
import StockTest from "@/components/Chart/StockTest";
import Select from "@/components/Chart/SelectUI";
import Buttons from "@/components/Chart/ButtonsUI";
import { useImmerReducer } from "use-immer";
import { getPageData, getStockInfo } from "@/Functions/fetchStockInfo";
import { stockState } from "@State/stockState";
import { useEffect, useState } from "react";
import React from "react";

import {
	elderRay,
	ema,
	discontinuousTimeScaleProviderBuilder,
	Chart,
	ChartCanvas,
	CurrentCoordinate,
	BarSeries,
	CandlestickSeries,
	ElderRaySeries,
	LineSeries,
	MovingAverageTooltip,
	OHLCTooltip,
	SingleValueTooltip,
	lastVisibleItemBasedZoomAnchor,
	XAxis,
	YAxis,
	CrossHairCursor,
	EdgeIndicator,
	MouseCoordinateX,
	MouseCoordinateY,
	ZoomButtons,
	withDeviceRatio,
	withSize,
} from "react-financial-charts";

export default function CandleStickStockChart(props) {
	if (!props.info) {
		return <h1>Loading...</h1>;
	}

	const initialState = {
		period: "d",
		time: "1Y",
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
		}
	}

	const [state, dispatch] = useImmerReducer(ourReducer, initialState);

	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);

	useEffect(() => {
		setInfo(props.info);
		setData(props.data);
	}, []);

	return (
		<Stock>
			<h2 className="text-2xl font-bold my-8">
				<div>
					<div>
						<Select dispatcher={dispatch} />
						<Buttons dispatcher={dispatch} />
					</div>
					<StockTest
						loading={state.loading}
						stockId={props.info.id}
						period={state.period}
						time={state.time}
						dispatcher={dispatch}
					/>
				</div>
			</h2>
		</Stock>
	);
}

export async function getStaticPaths() {
	return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
	const info = await getStockInfo({ params });
	const data = await getPageData(info.id, "overview");

	return {
		props: {
			info,
			data,
		},
	};
}
