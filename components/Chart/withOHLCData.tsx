import { timeParse } from 'd3-time-format';
import * as React from 'react';
import { IOHLCData } from './iOHLCData';
import Axios from 'axios';

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

function fixDataHeaders(obj) {
	var newObj = {
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
}

interface WithOHLCState {
	data?: IOHLCData[];
	message: string;
	period: string;
	time: string;
	loading: boolean;
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
					message: `Loading ${dataSet} data...`,
					period: '',
					time: '',
					loading: true,
				};
			}

			public componentDidMount() {
				Axios.get(
					`https://stockanalysis.com/wp-json/sa/cch?i=${this.props['stockId']}&p=${this.props['period']}&r=MAX`
				).then((res) => {
					const forDateParse = res.data.map(fixDataHeaders);
					const data = forDateParse.map(parseData());
					const period = this.props['period'];
					this.setState({ period });
					const time = this.props['time'];
					this.setState({ time });
					this.setState({ data });
					this.props['dispatcher']({
						type: 'changeLoading',
						value: false,
					});
				});
			}

			public render() {
				const { data, message } = this.state;
				const { period } = this.state;

				if (period != this.props['period']) {
					Axios.get(
						`https://stockanalysis.com/wp-json/sa/cch?i=${this.props['stockId']}&p=${this.props['period']}&r=MAX`
					).then((res) => {
						const forDateParse = res.data.map(fixDataHeaders);
						const data = forDateParse.map(parseData());
						const period = this.props['period'];
						const time = this.props['time'];
						this.setState({ period });
						this.setState({ time });
						this.setState({ data });
					});
				}

				if (data === undefined) {
					return <div className="center">{message}</div>;
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
