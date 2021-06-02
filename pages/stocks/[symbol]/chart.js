import Stock from "@/components/Layout/StockLayout";
import StockTest from "@/components/Chart/StockTest";
import { getPageData, getStockInfo } from "@/Functions/fetchStockInfo";
import { stockState } from "@State/stockState";
import { useEffect, useState } from "react";
import { initialData, secondaryData } from "@/components/datatemp";
import CandleStickChartCustom from "@/components/Chart/CandlestickChartCustom";

import Axios from "axios";

import React from "react";
import ReactDOM from "react-dom";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
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

export default function SymbolStatistics(props) {
	if (!props.info) {
		return <h1>Loading...</h1>;
	}
	var data = initialData;
	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);
	var changer = 0;
	useEffect(() => {
		setInfo(props.info);
		setData(props.data);
	}, []);

	function onChangeFunc() {
		if (changer == 0) {
			data = secondaryData;
			changer = 1;
		} else {
			data = initialData;
			changer = 0;
		}
		console.log(data);
	}

	return (
		<Stock>
			<h2 className="text-2xl font-bold my-8">
				<input type="text" name="name" onChange={onChangeFunc} />
				<div>
					<StockTest data={data} width={900} height={600} />
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
