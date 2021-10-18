import { timeParse } from 'd3-time-format';
import * as React from 'react';
import { IOHLCData } from './iOHLCData';
import Axios from 'axios';
import { Unavailable } from 'components/Unavailable';
import { getData } from 'functions/API';

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

const parseData1D5D = () => {
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

const fetchChartData = async (stockId: any, time: any) => {
	const params = `i=${stockId}&r=${time}&m=1`;
	const url = `c?${params}`;
	const data = await getData(url);
	return data;
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
	const newObj = {
		date: obj.t,
		open: obj.o,
		close: obj.c,
	};
	return newObj;
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
					`https://api.stockanalysis.com/wp-json/sa/cch?i=${props.stockId}&p=${props.period}&r=MAX`
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
				let { data, period, stockId, time } = this.state;
				const newState: WithOHLCState = this.props;

				if (period != newState.period || stockId != newState.stockId) {
					Axios.get(
						`https://api.stockanalysis.com/wp-json/sa/cch?i=${newState.stockId}&p=${newState.period}&r=MAX`
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
				} else if (
					(newState.time == '1D' && time != '1D') ||
					(newState.time == '5D' && time != '5D')
				) {
					this.props.setLoading(true);
					const newData = fetchChartData(newState.stockId, newState.time);
					newData.then((data) => {
						const forDateParse = data.map(fixDataHeaders1D5D);
						data = forDateParse.map(parseData1D5D());
						this.setState({ data });
						time = newState.time;
						this.setState({ time });
						this.props.setLoading(false);
					});
				} else if (
					(time == '5D' || time == '1D') &&
					newState.time != '1D' &&
					newState.time != '5D'
				) {
					this.props.setLoading(true);
					Axios.get(
						`https://api.stockanalysis.com/wp-json/sa/cch?i=${this.props.stockId}&p=${this.props.period}&r=MAX`
					)
						.then((res) => {
							const forDateParse = res.data.map(fixDataHeaders);
							const data = forDateParse.map(parseData());
							this.setState({ data });
							time = newState.time;
							this.setState({ time });
							this.props.setLoading(false);
							this.props.setData(data);
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

				{
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
