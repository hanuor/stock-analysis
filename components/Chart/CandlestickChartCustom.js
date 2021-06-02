import Stock from "@/components/Layout/StockLayout";
import { getPageData, getStockInfo } from "@/Functions/fetchStockInfo";
import { stockState } from "@State/stockState";
import { useEffect, useState } from "react";
//import { initialData, secondaryData } from "@/components/datatemp";
import { CandleStickChart } from "@/components/Chart/CandlestickChartCustom";
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
export default function CandleStickChartCustom(props) {
	/*if (!props.info) {
		return <h1>Loading...</h1>;
	}*/
	console.log(props.props);
	const initialData = props.props;
	const [period, setPeriod] = useState("d");
	const [time, setTime] = useState("1Y");

	const info = stockState((state) => state.info);
	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);

	const ScaleProvider =
		discontinuousTimeScaleProviderBuilder().inputDateAccessor(
			(d) => new Date(d.date)
		);
	const height = 600;
	const width = 900;
	const margin = { left: 35, right: 62, top: 0, bottom: 24 };

	const ema12 = ema()
		.id(1)
		.options({ windowSize: 12 })
		.merge((d, c) => {
			d.ema12 = c;
		})
		.accessor((d) => d.ema12);

	const ema26 = ema()
		.id(2)
		.options({ windowSize: 26 })
		.merge((d, c) => {
			d.ema26 = c;
		})
		.accessor((d) => d.ema26);

	const elder = elderRay();

	const calculatedData = elder(ema26(ema12(initialData)));
	var { data, xScale, xAccessor, displayXAccessor } =
		ScaleProvider(initialData);
	const pricesDisplayFormat = format(".2f");
	const max = xAccessor(data[data.length - 1]);
	const min = xAccessor(data[Math.max(0, data.length - 100)]);
	const xExtents = [min, max + 5];

	const gridHeight = height - margin.top - margin.bottom;

	const elderRayHeight = 100;
	const elderRayOrigin = (_, h) => [0, h - elderRayHeight];
	const barChartHeight = gridHeight / 4;
	const barChartOrigin = (_, h) => [0, h - barChartHeight - elderRayHeight];
	const chartHeight = gridHeight - elderRayHeight;
	const yExtents = (data) => {
		return [data.high, data.low];
	};
	const dateTimeFormat = "%d %b";
	const timeDisplayFormat = timeFormat(dateTimeFormat);

	const barChartExtents = (data) => {
		return data.volume;
	};

	const candleChartExtents = (data) => {
		return [data.high, data.low];
	};

	const yEdgeIndicator = (data) => {
		return data.close;
	};

	const volumeColor = (data) => {
		return "#006400";
	};

	const volumeSeries = (data) => {
		return data.volume;
	};

	const ma1color = "#2c6288";
	const ma2color = "#c65102";

	const openCloseColor = (data) => {
		return data.close > data.open ? "#185a37" : "#B90E0A";
	};

	useEffect(() => {
		setInfo(props.info);
		setData(props.data);
	}, []);

	function handleDataChange(e) {
		const ScaleProvider =
			discontinuousTimeScaleProviderBuilder().inputDateAccessor(
				(d) => new Date(d.date)
			);
		var { newdata, newxScale, newxAccessor, newdisplayXAccessor } =
			ScaleProvider(secondaryData);
		console.log(data);
		console.log(newdata);
		data = newdata;
		console.log(data);
		xScale = newxScale;
		xAccessor = newxAccessor;
		displayXAccessor = newdisplayXAccessor;

		console.log("yes");
		if (e.key === "y") {
			alert("The sky is your starting point!");
		} else if (e.key === "n") {
			alert("The sky is your limit👀");
		}
	}

	const [chartData, setChartData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	console.log(info.id);
	const axios = require("axios");

	useEffect(() => {
		async function fetchChartData() {
			try {
				console.log(info.id);
				const response = await Axios.get(
					`/api/chart?i=${info.id}&p=${period}&t=${time}`,
					{
						timeout: 5000,
					}
				);

				setChartData(response.data);
				setIsLoading(false);
				console.log(response);
			} catch (e) {
				console.log(e);
			}
		}

		fetchChartData();
	}, []);
	return (
		<ChartCanvas
			height={height}
			ratio={2}
			width={width}
			margin={margin}
			data={data}
			displayXAccessor={displayXAccessor}
			seriesName="Data"
			xScale={xScale}
			xAccessor={xAccessor}
			xExtents={xExtents}
			zoomAnchor={lastVisibleItemBasedZoomAnchor}>
			<Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
				<XAxis showTickLabel={true} />
				<YAxis showGridLines={true} tickFormat={pricesDisplayFormat} />
				<CandlestickSeries />
				<LineSeries
					yAccessor={ema26.accessor()}
					strokeStyle={ema26.stroke()}
				/>
				<CurrentCoordinate
					yAccessor={ema26.accessor()}
					fillStyle={ema26.stroke()}
				/>
				<LineSeries
					yAccessor={ema12.accessor()}
					strokeStyle={ema12.stroke()}
				/>
				<CurrentCoordinate
					yAccessor={ema12.accessor()}
					fillStyle={ema12.stroke()}
				/>
				<MouseCoordinateY
					rectWidth={margin.right}
					displayFormat={pricesDisplayFormat}
				/>

				<EdgeIndicator
					itemType="last"
					rectWidth={margin.right - 20}
					rectHeight={15}
					fill={ma2color}
					orient="right"
					edgeAt="right"
					fontSize="11"
					lineStroke={ma2color}
					displayFormat={pricesDisplayFormat}
					yAccessor={ema26.accessor()}
				/>
				<EdgeIndicator
					itemType="last"
					rectWidth={margin.right - 20}
					rectHeight={15}
					hideLine={true}
					fill={ma1color}
					orient="right"
					edgeAt="right"
					fontSize="11"
					lineStroke={ma1color}
					displayFormat={pricesDisplayFormat}
					yAccessor={ema12.accessor()}
				/>
				<EdgeIndicator
					itemType="last"
					rectWidth={margin.right - 15}
					fill={openCloseColor}
					lineStroke={openCloseColor}
					displayFormat={pricesDisplayFormat}
					yAccessor={yEdgeIndicator}
					fontSize="13"
				/>
				<MovingAverageTooltip
					origin={[8, 24]}
					options={[
						{
							yAccessor: ema26.accessor(),
							type: "EMA",
							stroke: ema26.stroke(),
							windowSize: ema26.options().windowSize,
						},
						{
							yAccessor: ema12.accessor(),
							type: "EMA",
							stroke: ema12.stroke(),
							windowSize: ema12.options().windowSize,
						},
					]}
				/>
				<ZoomButtons />
				<OHLCTooltip origin={[8, 16]} />
			</Chart>
			<Chart
				id={4}
				height={100}
				origin={(w, h) => [0, h - 200]}
				yExtents={(d) => d.volume}>
				<YAxis
					axisAt="left"
					orient="left"
					ticks={5}
					gridLinesStrokeWidth={0}
					tickFormat={format(".2s")}
					showDomain={false}
					tickStrokeOpacity={0}
					innerTickSize={0}
				/>
				<BarSeries
					clip="false"
					yAccessor={(d) => d.volume}
					fillStyle={(d) => (d.close > d.open ? "#6BA583" : "red")}
				/>
				<EdgeIndicator
					itemType="last"
					rectWidth={margin.right - 20}
					rectHeight={15}
					fill={volumeColor}
					orient="right"
					edgeAt="right"
					fontSize="11"
					lineStroke={openCloseColor}
					displayFormat={format(".4s")}
					yAccessor={volumeSeries}
					yAxisPad={0}
				/>
			</Chart>
			<CrossHairCursor />
		</ChartCanvas>
	);
}
