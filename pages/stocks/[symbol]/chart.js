import Stock from "@/components/Layout/LayoutStock";
import PageContext from "@/components/Context/PageContext";
import {
	getStockUrls,
	getPageData,
	getStockInfo,
} from "@/Functions/fetchStockInfo";

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
	return (
		<Stock props={props.info}>
			<PageContext.Provider value={props.data}>
				<h2 className="text-2xl font-bold my-8">
					This is the chart page for {props.info.ticker}
				</h2>
			</PageContext.Provider>
		</Stock>
	);
}

export async function getStaticPaths() {
	const paths = getStockUrls();

	return {
		paths,
		fallback: true,
	};
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
