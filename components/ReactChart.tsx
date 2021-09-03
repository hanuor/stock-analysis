// Adapted from: https://github.com/xr0master/chartjs-react (MIT License)
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Chart } from 'chart.js';

import type {
	ChartOptions,
	ChartData,
	ChartType,
	Plugin,
	UpdateMode,
} from 'chart.js';

const noop = () => {};

export interface ChartProps {
	id: string;
	data: ChartData;
	options: ChartOptions;
	type: ChartType;
	plugins?: Plugin[];
	updateMode?: UpdateMode;
	height?: number;
	width?: number;
}

export const ReactChart = ({
	id,
	data,
	options,
	type,
	plugins,
	updateMode,
	height,
	width,
}: ChartProps) => {
	const chartInstance = useRef<Chart>({
		update: noop,
		destroy: noop,
	} as Chart);
	const [CHART_ID] = useState(id);

	useEffect(() => {
		chartInstance.current.data = data;
		chartInstance.current.options = options;

		chartInstance.current.update(updateMode);
	}, [data, options, updateMode]);

	const nodeRef = useCallback<(instance: HTMLCanvasElement | null) => void>(
		(node) => {
			chartInstance.current.destroy();

			if (node) {
				chartInstance.current = new Chart(node, {
					type,
					data,
					options,
					plugins,
				});
			}
		},
		[data, options, plugins, type]
	);
	
	return <canvas ref={nodeRef} height={height} width={width} id={CHART_ID} />;
};

ReactChart.register = Chart.register || noop;
