import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import * as React from 'react';
import {
	elderRay,
	sma,
	discontinuousTimeScaleProviderBuilder,
	Chart,
	ChartCanvas,
	CurrentCoordinate,
	BarSeries,
	CandlestickSeries,
	LineSeries,
	lastVisibleItemBasedZoomAnchor,
	XAxis,
	YAxis,
	CrossHairCursor,
	EdgeIndicator,
	MouseCoordinateY,
	// withDeviceRatio,
	// withSize,
} from 'react-financial-charts';
import { IOHLCData } from './iOHLCData';
import { HoverTooltipCustom } from 'components/Chart/HoverTooltipCustom';
import { OHLCTooltipCustom } from 'components/Chart/OHLCTooltipCustom';
import { withSize } from 'components/Chart/withSizeCustom';
import { withDeviceRatio } from 'components/Chart/withDeviceRatioCustom';
import { MovingAverageTooltipCustom } from 'components/Chart/MovingAverageTooltipCustom';
import { withOHLCData } from './withOHLCData';

interface StockChartProps {
	readonly data: IOHLCData[];
	readonly height: number;
	readonly dateTimeFormat?: string;
	readonly width: number;
	readonly ratio: number;
	readonly loading: boolean;
	readonly type: string;
	readonly period: string;
	readonly time: string;
	readonly stockId: number;
	readonly message: string;
}

interface TooltipOptions {
	yAccessor: (data: any) => number;
	type: string;
	stroke: string;
	windowSize: number | null;
}

class StockChart extends React.Component<StockChartProps> {
	private readonly dateFormat = timeFormat('%Y-%m-%d');
	private readonly margin = { left: 0, right: 62, top: 0, bottom: 24 };
	private readonly pricesDisplayFormat = format('.2f');
	private readonly volumeDisplayFormat = format('.4s');
	private readonly changeDisplayFormat = format('+.2f');
	private readonly percentDisplayFormat = format('+.2%');

	private readonly xScaleProvider =
		discontinuousTimeScaleProviderBuilder().inputDateAccessor(
			(d: IOHLCData) => d.date
		);

	public render() {
		const { data: initialData, height, ratio, width, type } = this.props;

		const disablePan = false;
		const disableZoom = false;

		const candlesAppearance = {
			fill: function fill(d: IOHLCData) {
				// return d.close > d.open ? 'rgba(30, 130, 76, 1)' : 'rgba(180,0,0)';
				return d.close > d.open ? '#26a69a' : '#ef5350';
			},
			clip: true,
			candleStrokeWidth: 0.5,
			widthRatio: 0.8,
		};

		const openCloseColor = (data: IOHLCData) => {
			return data.close > data.open ? '#26a69a' : '#ef5350';
		};

		const priceOrCandleStickColor = (data: IOHLCData) => {
			return type == 'line' ? '#000000' : openCloseColor(data);
		};

		const candleChartExtents = (data: IOHLCData) => {
			return [data.high, data.low, data.ma1, data.ma2];
		};

		const volChartExtents = (data: IOHLCData) => {
			return [data.volume, 0];
		};

		const yEdgeIndicator = (data: IOHLCData) => {
			return data.close;
		};
		const volumeColor = (data: IOHLCData) => {
			return data.close > data.open
				? 'rgba(38, 166, 154, 1)'
				: 'rgba(239, 83, 80, 1)';
		};
		const volumeSeries = (data: IOHLCData) => {
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

		const movingAverageTooltipOptions: TooltipOptions[] = [
			{
				yAccessor: (d: IOHLCData) => d.ma1,
				type: 'SMA',
				stroke: sma50.stroke(),
				windowSize: sma50.options().windowSize,
			},
			{
				yAccessor: (d: IOHLCData) => d.ma2,
				type: 'SMA',
				stroke: sma200.stroke(),
				windowSize: sma200.options().windowSize,
			},
		];

		const calculatedData = elder(sma200(sma50(initialData)));

		const { margin, xScaleProvider } = this;

		const { data, xScale, xAccessor, displayXAccessor } =
			xScaleProvider(calculatedData);

		if (type == 'line') {
			movingAverageTooltipOptions.push({
				yAccessor: (d) => d.close,
				type: 'Price',
				stroke: '#000000',
				windowSize: null,
			});
		}

		let max = xAccessor(data[data.length - 1]);
		let min = 0;
		let days = 0;

		const date: any = new Date(data[data.length - 1].date);

		if (this.props.time == '1Y') {
			max = max + 2;
			days = 365;
		} else if (this.props.time == '1M') {
			days = 31;
			max = max + 1;
		} else if (this.props.time == '6M') {
			max = max + 2;
			days = 183;
		} else if (this.props.time == 'YTD') {
			max = max + 2;
			const YTDdate: any = new Date('01/01/' + new Date().getFullYear());
			const difference = date.getTime() - YTDdate.getTime();
			days = difference / (1000 * 3600 * 24);
		} else if (this.props.time == '3Y') {
			max = max + 4;
			days = 1095;
		} else if (this.props.time == '5Y') {
			max = max + 8;
			days = 1825;
		}
		if (this.props.time != 'MAX') {
			date.setDate(date.getDate() - days);

			for (let i = data.length - 1; -1 < i; i--) {
				const dateIndex: Date = new Date(data[i].date);
				if (date > dateIndex) {
					min = xAccessor(data[i + 1]);
					break;
				}
				if (i == 0) {
					min = xAccessor(data[i]);
				}
			}
		} else {
			max = max + 6;
			min = 0;
		}
		/*
		const calcExtent = (data: any[]) => {
			let max = data.length - 1;
			let min = 0;
			let days = 0;

			const date: any = new Date(data[data.length - 1].date);

			if (this.props.time == '1Y') {
				max = max + 2;
				days = 365;
			} else if (this.props.time == '1M') {
				days = 31;
				max = max + 1;
			} else if (this.props.time == '6M') {
				max = max + 2;
				days = 183;
			} else if (this.props.time == 'YTD') {
				max = max + 2;
				const YTDdate: any = new Date('01/01/' + new Date().getFullYear());
				const difference = date.getTime() - YTDdate.getTime();
				days = difference / (1000 * 3600 * 24);
			} else if (this.props.time == '3Y') {
				max = max + 4;
				days = 1095;
			} else if (this.props.time == '5Y') {
				max = max + 8;
				days = 1825;
			}
			if (this.props.time != 'MAX') {
				date.setDate(date.getDate() - days);

				for (let i = data.length - 1; -1 < i; i--) {
					const dateIndex: Date = new Date(data[i].date);
					if (date > dateIndex) {
						min = xAccessor(data[i + 1]);
						break;
					}
					if (i == 0) {
						min = xAccessor(data[i]);
					}
				}
			} else {
				max = max + 6;
				min = 0;
			}
			if (typeof min == 'number' && typeof max == 'number') {
				const range: [number, number] | undefined = [min, max];
				return range;
			}
		};

		/*
		const volumeMax = Math.max.apply(
			Math,
			dataSubset.map(function (o) {
				return o.volume;
			})
		);
		const volumeMin = Math.min.apply(
			Math,
			data.map(function (o) {
				return o.volume;
			})
		);

		const volumeYExtents = [0, volumeMax]; */

		const xExtents = [min, max];

		const gridHeight = height - margin.top - margin.bottom;

		const chartHeight = gridHeight;
		const ma1color = '#2c6288';
		const ma2color = '#c65102';

		if (this.props.loading) {
			return null;
		}

		return (
			<ChartCanvas
				height={height}
				ratio={ratio}
				width={width}
				margin={margin}
				data={data}
				displayXAccessor={displayXAccessor}
				seriesName="Data"
				disablePan={disablePan}
				disableZoom={disableZoom}
				xScale={xScale}
				xAccessor={xAccessor}
				xExtents={xExtents}
				zoomAnchor={lastVisibleItemBasedZoomAnchor}
			>
				<Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
					<XAxis showTickLabel={true} />
					<YAxis
						showGridLines={true}
						tickFormat={this.pricesDisplayFormat}
					/>
					{type == 'candlestick' ? (
						<CandlestickSeries {...candlesAppearance} />
					) : (
						<>
							<LineSeries
								yAccessor={(d) => d.close}
								strokeStyle={'#000000'}
							/>
							<CurrentCoordinate
								yAccessor={(d) => d.close}
								fillStyle={priceOrCandleStickColor}
							/>
						</>
					)}

					<LineSeries
						yAccessor={(d) => d.ma1}
						strokeStyle={sma50.stroke()}
					/>
					<CurrentCoordinate
						yAccessor={(d) => d.ma1}
						fillStyle={sma200.stroke()}
					/>
					<LineSeries
						yAccessor={(d) => d.ma2}
						strokeStyle={sma200.stroke()}
					/>
					<CurrentCoordinate
						yAccessor={(d) => d.ma2}
						fillStyle={sma50.stroke()}
					/>

					<MouseCoordinateY
						rectWidth={margin.right - 15}
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
						fill={priceOrCandleStickColor}
						lineStroke={priceOrCandleStickColor}
						displayFormat={this.pricesDisplayFormat}
						yAccessor={yEdgeIndicator}
						fontSize={13}
					/>
					<OHLCTooltipCustom origin={[5, 15]} />
					<MovingAverageTooltipCustom
						origin={[8, 24]}
						options={movingAverageTooltipOptions}
					/>
					<HoverTooltipCustom
						yAccessor={sma50.accessor()}
						tooltip={{
							content: ({ currentItem, xAccessor }) => ({
								x: this.dateFormat(xAccessor(currentItem)),
								y: [
									{
										label: 'Open',
										value:
											currentItem.open &&
											this.pricesDisplayFormat(currentItem.open),
									},
									{
										label: 'High',
										value:
											currentItem.high &&
											this.pricesDisplayFormat(currentItem.high),
									},
									{
										label: 'Low',
										value:
											currentItem.low &&
											this.pricesDisplayFormat(currentItem.low),
									},
									{
										label: 'Close',
										value:
											currentItem.close &&
											this.pricesDisplayFormat(currentItem.close),
									},
									{
										label: 'Volume',
										value:
											currentItem.volume &&
											this.volumeDisplayFormat(currentItem.volume),
									},
								],
							}),
						}}
					/>
				</Chart>
				<Chart
					id={4}
					height={100}
					origin={(w, h) => [0, h - 100]}
					yExtents={volChartExtents}
				>
					<BarSeries
						widthRatio={0.5}
						clip={true}
						yAccessor={(d) => d.volume}
						fillStyle={(d) => (d.close > d.open ? '#6BA583' : 'red')}
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
						displayFormat={format('.4s')}
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
