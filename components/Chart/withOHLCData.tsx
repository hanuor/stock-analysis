import { timeParse } from 'd3-time-format';
import * as React from 'react';
import { IOHLCData } from './iOHLCData';
import Axios from 'axios';
import { Unavailable } from 'components/Unavailable';

const parseDate = timeParse('%Y-%m-%d');
const parseDate1D5D = timeParse('%b %d, %Y %H:%M');

const parseData = () => {
	return (d: any) => {
		const date = parseDate(d.date);
		if (date === null) {
			d.date = new Date(Number(d.date));
		} else {
			d.date = new Date(date);
		}

		for (const key in d) {
			if (key !== 'date' && Object.prototype.hasOwnProperty.call(d, key)) {
				d[key] = +d[key];
			}
		}

		return d as IOHLCData;
	};
};

const parseData1D5D = (time: string) => {
	return (d: any) => {
		const date = parseDate1D5D(d.date);

		if (date === null) {
			d.date = new Date(Number(d.date));
		} else {
			d.date = new Date(date);
		}

		for (const key in d) {
			if (key !== 'date' && Object.prototype.hasOwnProperty.call(d, key)) {
				d[key] = +d[key];
			}
		}

		return d as IOHLCData;
	};
};

function fixDataHeaders(obj: any) {
	const newObj = {
		open: obj.o,
		close: obj.c,
		high: obj.h,
		low: obj.l,
		volume: obj.v,
		date: obj.t,
		ma1: obj.ma1,
		ma2: obj.ma2,
	};
	return newObj;
}

function fixDataHeaders1D5D(obj: any) {
	return {
		date: obj.t,
		close: obj.c,
		high: obj.h,
		low: obj.l,
		open: obj.o,
		volume: obj.v,
	};
}

interface WithOHLCDataProps {
	readonly data: IOHLCData[];
	readonly period: string;
	readonly time: string;
	readonly type: string;
	readonly stockId: number;
	readonly loading: boolean;
	readonly setLoading: (arg: boolean) => void;
	readonly setData: (arg: IOHLCData[]) => void;
}

interface WithOHLCState {
	data?: IOHLCData[];
	period: string;
	time: string;
	type: string;
	stockId: number;
	saveData?: IOHLCData[];
}

export function withOHLCData(dataSet = 'DAILY') {
	return <TProps extends WithOHLCDataProps>(
		OriginalComponent: React.ComponentClass<TProps>
	) => {
		return class WithOHLCData extends React.Component<
			Omit<TProps, 'data'>,
			WithOHLCState
		> {
			public constructor(props: Omit<TProps, 'data'>) {
				super(props);
				this.state = {
					period: props.period,
					time: props.time,
					stockId: props.stockId,
					type: props.type,
					data: undefined,
				};
				Axios.get(
					`https://api.stockanalysis.com/wp-json/sa/chart?i=${props.stockId}&p=${props.period}&r=MAX`
				)
					.then((res) => {
						const forDateParse = res.data.map(fixDataHeaders);
						const data = forDateParse.map(parseData());
						this.setState({ data });
						props.setLoading(false);
						props.setData(data);
					})
					.catch((error) => {
						console.error(
							'Error: There was an error loading the data for the chart |',
							error
						);
						props.setLoading(false);
						return (
							<Unavailable message="Unable to load the data for this chart." />
						);
					});
			}

			public render() {
				let { data, period, stockId, time, saveData } = this.state;
				const newState: WithOHLCState = this.props;

				if (period != newState.period || stockId != newState.stockId) {
					this.props.setLoading(true);
					if (time == '1D' || time == '5D') {
						Axios.get(
							`https://api.stockanalysis.com/wp-json/sa/chart?i=${newState.stockId}&r=${time}`
						)
							.then((res) => {
								const forDateParse = res.data.map(fixDataHeaders1D5D);
								data = forDateParse.map(parseData1D5D(time));

								if (period != newState.period) {
									period = newState.period;
									this.setState({ period });
									this.setState({ data });
									saveData = [];
									this.setState({ saveData });
								} else {
									stockId = newState.stockId;
									this.setState({ stockId });
									this.setState({ data });
									saveData = [];
									this.setState({ saveData });
								}
								this.props.setLoading(false);
							})
							.catch((error) => {
								console.error(
									'Error: There was an error loading the data for the chart |',
									error
								);
								this.props.setLoading(false);
								return (
									<Unavailable message="Unable to load the data for this chart." />
								);
							});
					} else {
						Axios.get(
							`https://api.stockanalysis.com/wp-json/sa/chart?i=${newState.stockId}&p=${newState.period}&r=MAX`
						)
							.then((res) => {
								const forDateParse = res.data.map(fixDataHeaders);
								data = forDateParse.map(parseData());

								if (period != newState.period) {
									period = newState.period;
									this.setState({ period });
									this.setState({ data });
								} else {
									stockId = newState.stockId;
									this.setState({ stockId });
									this.setState({ data });
								}
								this.props.setLoading(false);
								if (typeof data != 'undefined') {
									this.props.setData(data);
								}
							})
							.catch((error) => {
								console.error(
									'Error: There was an error loading the data for the chart |',
									error
								);
								this.props.setLoading(false);
								return (
									<Unavailable message="Unable to load the data for this chart." />
								);
							});
					}
					// Case where someone is clicking '1D' or '5D'
				} else if (
					(newState.time == '1D' && time != '1D') ||
					(newState.time == '5D' && time != '5D')
				) {
					this.props.setLoading(true);
					// Save Max Data
					if (!saveData) {
						saveData = data;
						this.setState({ saveData });
					}

					Axios.get(
						`https://api.stockanalysis.com/wp-json/sa/chart?i=${this.props.stockId}&r=${newState.time}&f=candles`
					)
						.then((res) => {
							const forDateParse = res.data.map(fixDataHeaders1D5D);
							data = forDateParse.map(parseData1D5D(this.props.time));
							this.setState({ data });
							const time = newState.time;
							this.setState({ time });
							this.props.setLoading(false);
							if (typeof data != 'undefined') {
								this.props.setData(data);
							}
						})
						.catch((error) => {
							console.error(
								'Error: There was an error loading the data for the chart |',
								error
							);
							this.props.setLoading(false);
							return (
								<Unavailable message="Unable to load the data for this chart." />
							);
						});
					// Case where someone is already at '1D' or '5D' and is now clicking the other values.
				} else if (
					(time == '5D' || time == '1D') &&
					newState.time != '1D' &&
					newState.time != '5D'
				) {
					if (typeof saveData != 'undefined' && saveData.length > 0) {
						data = saveData;
						time = newState.time;
						this.setState({ time });
						this.setState({ data });
						if (typeof data != 'undefined') {
							this.props.setData(data);
						}
					} else {
						this.props.setLoading(true);
						Axios.get(
							`https://api.stockanalysis.com/wp-json/sa/chart?i=${stockId}&p=${period}&r=MAX`
						)
							.then((res) => {
								const forDateParse = res.data.map(fixDataHeaders);
								data = forDateParse.map(parseData());
								this.props.setLoading(false);
								if (typeof data != 'undefined') {
									this.props.setData(data);
								}
								time = newState.time;
								this.setState({ time });
								saveData = data;
								this.setState({ saveData });
							})
							.catch((error) => {
								console.error(
									'Error: There was an error loading the data for the chart |',
									error
								);
								this.props.setLoading(false);
								return (
									<Unavailable message="Unable to load the data for this chart." />
								);
							});
					}
				}

				if (data === undefined) {
					return <div></div>;
				}

				return (
					<OriginalComponent
						{...(this.props as TProps)}
						data={data}
						height={900}
					/>
				);
			}
		};
	};
}
