import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import * as React from "react";
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
import { IOHLCData } from "./iOHLCData";
import { withOHLCData } from "./withOHLCData";

interface StockChartProps {
	readonly data: IOHLCData[];
	readonly height: number;
	readonly dateTimeFormat?: string;
	readonly width: number;
	readonly ratio: number;
}

class StockChart extends React.Component<StockChartProps> {
	private readonly margin = { left: 35, right: 62, top: 0, bottom: 24 };
	private readonly pricesDisplayFormat = format(".2f");
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

		const ema12 = ema()
			.id(1)
			.options({ windowSize: 12 })
			.merge((d: any, c: any) => {
				d.ema12 = c;
			})
			.accessor((d: any) => d.ema12);

		const ema26 = ema()
			.id(2)
			.options({ windowSize: 26 })
			.merge((d: any, c: any) => {
				d.ema26 = c;
			})
			.accessor((d: any) => d.ema26);

		const elder = elderRay();

		const calculatedData = elder(ema26(ema12(initialData)));

		const { margin, xScaleProvider } = this;

		const { data, xScale, xAccessor, displayXAccessor } =
			xScaleProvider(calculatedData);

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
					<YAxis
						showGridLines={true}
						tickFormat={this.pricesDisplayFormat}
					/>
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
						fontSize={11}
						lineStroke={ma1color}
						displayFormat={this.pricesDisplayFormat}
						yAccessor={ema12.accessor()}
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
						innerTickSize={0}
					/>
					<BarSeries
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
