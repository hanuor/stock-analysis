import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import * as React from "react";
import {
	elderRay,
	ema,
	sma,
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
	HoverTooltip,
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
import { IOHLCData } from "./iOHLCData";
import { HoverTooltipCustom } from "@/components/Chart/HoverToolTipCustom";
import { withOHLCData } from "./withOHLCData";
import { current } from "immer";

interface StockChartProps {
	readonly data: IOHLCData[];
	readonly height: number;
	readonly dateTimeFormat?: string;
	readonly width: number;
	readonly ratio: number;
}

class StockChart extends React.Component<StockChartProps> {
	private readonly dateFormat = timeFormat("%Y-%m-%d");
	private readonly margin = { left: 35, right: 62, top: 0, bottom: 24 };
	private readonly pricesDisplayFormat = format(".2f");
	private readonly volumeDisplayFormat = format(".4s");
	private readonly xScaleProvider =
		discontinuousTimeScaleProviderBuilder().inputDateAccessor(
			(d: IOHLCData) => d.date
		);

	public render() {
		const {
			data: initialData,
			dateTimeFormat = "%d %b",
			height,
			ratio,
			width,
		} = this.props;

		const candlesAppearance = {
			fill: function fill(d) {
				return d.close > d.open ? "rgba(30, 130, 76, 1)" : "rgba(180,0,0)";
			},
			clip: true,
			candleStrokeWidth: 0.5,
			widthRatio: 0.8,
		};
		console.log(this.props);
		const openCloseColor = (data) => {
			return data.close > data.open ? "#26a69a" : "#ef5350";
		};

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
			return data.close > data.open
				? "rgba(38, 166, 154, 0.3)"
				: "rgba(239, 83, 80, 0.3)";
		};
		const volumeSeries = (data) => {
			return data.volume;
		};

		const sma50 = sma()
			.id(1)
			.options({ windowSize: 50 })
			.merge((d: any, c: any) => {
				d.sma50 = c;
			})
			.accessor((d: any) => d.sma50);

		const sma200 = sma()
			.id(2)
			.options({ windowSize: 200 })
			.merge((d: any, c: any) => {
				d.sma200 = c;
			})
			.accessor((d: any) => d.sma200);

		const elder = elderRay();
		console.log(sma50.accessor);
		const calculatedData = elder(sma200(sma50(initialData)));
		console.log(calculatedData);
		const { margin, xScaleProvider } = this;

		const { data, xScale, xAccessor, displayXAccessor } =
			xScaleProvider(calculatedData);
		console.log(data);
		const max = xAccessor(data[data.length - 1]);
		const min = xAccessor(data[Math.max(0, data.length - 100)]);
		const xExtents = [min, max + 5];

		const gridHeight = height - margin.top - margin.bottom;

		const elderRayHeight = 100;
		const elderRayOrigin = (_: number, h: number) => [0, h - elderRayHeight];
		const barChartHeight = gridHeight / 4;
		const barChartOrigin = (_: number, h: number) => [
			0,
			h - barChartHeight - elderRayHeight,
		];
		const chartHeight = gridHeight - elderRayHeight;
		const ma1color = "#2c6288";
		const ma2color = "#c65102";

		const timeDisplayFormat = timeFormat(dateTimeFormat);
		const tooltipContent = () => {
			return ({ currentItem, xAccessor }) => {
				// the console.log() below is not logging in the console.
				console.log(xAccessor(currentItem));
				return {
					x: xAccessor(currentItem),
					y: [
						{
							label: "Type",
							value: currentItem.type && currentItem.type,
						},
						{
							label: "Value",
							value: currentItem.value && currentItem.value,
						},
						{
							label: "Volume",
							value: currentItem.volume && currentItem.volume,
						},
						{
							label: "Total Volume",
							value: currentItem.totalVolume && currentItem.totalVolume,
						},
					],
				};
			};
		};

		return (
			<ChartCanvas
				height={height}
				ratio={1}
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
					<YAxis
						showGridLines={true}
						tickFormat={this.pricesDisplayFormat}
					/>
					<CandlestickSeries {...candlesAppearance} />
					<LineSeries
						yAccessor={sma200.accessor()}
						strokeStyle={sma200.stroke()}
					/>
					<CurrentCoordinate
						yAccessor={sma200.accessor()}
						fillStyle={sma200.stroke()}
					/>
					<LineSeries
						yAccessor={sma50.accessor()}
						strokeStyle={sma50.stroke()}
					/>
					<CurrentCoordinate
						yAccessor={sma50.accessor()}
						fillStyle={sma50.stroke()}
					/>
					<MouseCoordinateY
						rectWidth={margin.right}
						displayFormat={this.pricesDisplayFormat}
					/>

					<EdgeIndicator
						itemType="last"
						rectWidth={margin.right - 20}
						rectHeight={15}
						fill={ma2color}
						orient="right"
						edgeAt="right"
						fontSize={11}
						lineStroke={ma2color}
						displayFormat={this.pricesDisplayFormat}
						yAccessor={sma200.accessor()}
					/>
					<EdgeIndicator
						itemType="last"
						rectWidth={margin.right - 20}
						rectHeight={15}
						hideLine={true}
						fill={ma1color}
						orient="right"
						edgeAt="right"
						fontSize={11}
						lineStroke={ma1color}
						displayFormat={this.pricesDisplayFormat}
						yAccessor={sma50.accessor()}
					/>
					<EdgeIndicator
						itemType="last"
						rectWidth={margin.right - 15}
						fill={openCloseColor}
						lineStroke={openCloseColor}
						displayFormat={this.pricesDisplayFormat}
						yAccessor={yEdgeIndicator}
						fontSize={13}
					/>
					<HoverTooltipCustom
						yAccessor={sma50.accessor()}
						tooltip={{
							content: ({ currentItem, xAccessor }) => ({
								x: this.dateFormat(xAccessor(currentItem)),
								y: [
									{
										label: "Open",
										value:
											currentItem.open &&
											this.pricesDisplayFormat(currentItem.open),
									},
									{
										label: "High",
										value:
											currentItem.high &&
											this.pricesDisplayFormat(currentItem.high),
									},
									{
										label: "Low",
										value:
											currentItem.low &&
											this.pricesDisplayFormat(currentItem.low),
									},
									{
										label: "Close",
										value:
											currentItem.close &&
											this.pricesDisplayFormat(currentItem.close),
									},
									{
										label: "Volume",
										value:
											currentItem.volume &&
											this.volumeDisplayFormat(currentItem.volume),
									},
									{
										label: "MA (50)",
										value:
											currentItem.sma50 &&
											this.pricesDisplayFormat(currentItem.sma50),
									},
									{
										label: "MA (200)",
										value:
											currentItem.sma200 &&
											this.pricesDisplayFormat(currentItem.sma200),
									},
								],
							}),
						}}
					/>
					<ZoomButtons />
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
						innerTickSize={0}
					/>
					<BarSeries
						widthRatio={0.5}
						clip={true}
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
						fontSize={11}
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
}
export default withOHLCData()(
	withSize({ style: { minHeight: 600 } })(withDeviceRatio()(StockChart))
);
export const MinutesStockChart = withOHLCData("MINUTES")(
	withSize({ style: { minHeight: 600 } })(withDeviceRatio()(StockChart))
);
export const SecondsStockChart = withOHLCData("SECONDS")(
	withSize({ style: { minHeight: 600 } })(withDeviceRatio()(StockChart))
);
