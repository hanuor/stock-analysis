/* eslint-disable no-invalid-this */
import { functor, GenericChartComponent, last } from './core';
import { format } from 'd3-format';
import * as React from 'react';
import { ToolTipText } from './ToolTipText';
import { timeFormat } from 'd3-time-format';

const displayTextsDefault = {
	o: 'O: ',
	h: ' H: ',
	l: ' L: ',
	c: ' C: ',
	na: 'n/a',
};

export interface OHLCTooltipProps {
	readonly accessor?: (data: any) => any;
	readonly className?: string;
	readonly changeFormat?: (n: number | { valueOf(): number }) => string;
	readonly displayTexts?: {
		o: string;
		h: string;
		l: string;
		c: string;
		na: string;
	};
	readonly displayValuesFor?: (props: OHLCTooltipProps, moreProps: any) => any;
	readonly fontFamily?: string;
	readonly fontSize?: number;
	readonly fontWeight?: number;
	readonly labelFill?: string;
	readonly labelFontWeight?: number;
	readonly ohlcFormat?: (n: number | { valueOf(): number }) => string;
	readonly onClick?: (
		event: React.MouseEvent<SVGGElement, MouseEvent>
	) => void;
	readonly origin?:
		| [number, number]
		| ((width: number, height: number) => [number, number]);
	readonly percentFormat?: (n: number | { valueOf(): number }) => string;
	readonly textFill?: string | ((item: any) => string);
	readonly time?: string;
}

export class OHLCTooltipCustom extends React.Component<OHLCTooltipProps> {
	public static defaultProps = {
		accessor: (d: unknown) => d,
		changeFormat: format('+.2f'),
		className: 'react-financial-charts-tooltip-hover',
		displayTexts: displayTextsDefault,
		displayValuesFor: (_: any, props: any) => props.currentItem,
		fontFamily:
			"-apple-system, system-ui, 'Helvetica Neue', Ubuntu, sans-serif",
		ohlcFormat: format('.2f'),
		origin: [0, 0],
		percentFormat: format('.2%'),
	};

	public render() {
		return (
			<GenericChartComponent
				clip={false}
				svgDraw={this.renderSVG}
				drawOn={['mousemove']}
			/>
		);
	}

	private readonly renderSVG = (moreProps: any) => {
		const {
			accessor,
			changeFormat = OHLCTooltipCustom.defaultProps.changeFormat,
			className,
			displayTexts = OHLCTooltipCustom.defaultProps.displayTexts,
			displayValuesFor = OHLCTooltipCustom.defaultProps.displayValuesFor,
			fontFamily,
			fontSize,
			fontWeight,
			onClick,
			percentFormat = OHLCTooltipCustom.defaultProps.percentFormat,
			textFill,
			time,
		} = this.props;

		const {
			chartConfig: { width, height },
			fullData,
		} = moreProps;

		const currentItem =
			displayValuesFor(this.props, moreProps) ?? last(fullData);

		let change: string = displayTexts.na;
		let date: Date = new Date('August 19, 1975 23:15:30 GMT+11:00');

		if (currentItem !== undefined && accessor !== undefined) {
			const item = accessor(currentItem);
			if (item !== undefined) {
				date = item.date;
				change = `${changeFormat(item.close - item.open)} (${percentFormat(
					(item.close - item.open) / item.open
				)})`;
			}
		}

		const { origin: originProp } = this.props;
		const [x, y] = functor(originProp)(width, height);
		const valueFill = functor(textFill)(currentItem);

		return (
			<g
				className={className}
				transform={`translate(${x}, ${y})`}
				onClick={onClick}
			>
				<ToolTipText
					x={0}
					y={0}
					fontFamily={fontFamily}
					fontSize={fontSize}
					fontWeight={fontWeight}
				>
					{time == '1D' || time == '5D' ? (
						<tspan key="value_Change" fill={valueFill}>
							{`${timeFormat('%Y-%m-%d %H:%M')(date)}` +
								'  ' +
								`${change}`}
						</tspan>
					) : (
						<tspan key="value_Change" fill={valueFill}>
							{`${timeFormat('%Y-%m-%d')(date)}` + '  ' + `${change}`}
						</tspan>
					)}
				</ToolTipText>
			</g>
		);
	};
}
