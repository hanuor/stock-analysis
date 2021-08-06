import { timeParse } from 'd3-time-format';
import * as React from 'react';
import { IOHLCData } from './iOHLCData';
import Axios from 'axios';
import { Unavailable } from 'components/Unavailable';

const parseDate = timeParse('%Y-%m-%d');

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

interface WithOHLCDataProps {
	readonly data: IOHLCData[];
	readonly period: string;
	readonly time: string;
	readonly type: string;
	readonly stockId: number;
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
					period: '',
					time: '',
					stockId: 0,
					type: '',
				};
			}

			public render() {
				const { data, period } = this.state;

				const newState: WithOHLCState = this.props;

				if (period != newState.period) {
					Axios.get(
						`https://api.stockanalysis.com/wp-json/sa/cch?i=${newState.stockId}&p=${newState.period}&r=MAX`
					)
						.then((res) => {
							const forDateParse = res.data.map(fixDataHeaders);
							const data = forDateParse.map(parseData());
							const period = newState.period;
							this.setState({ period });
							this.setState({ data });
						})
						.catch((error) => {
							console.error(
								'Error: There was an error loading the data for the chart |',
								error
							);
							return (
								<Unavailable message="Unable to load the data for this chart." />
							);
						});
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
