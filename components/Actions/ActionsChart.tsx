import Link from 'next/link';
import { ActionsChartChart } from './ActionsChartChart';

interface Props {
	heading?: string;
	intro?: string;
	title: string;
	link?: string;
	data: {
		[key: string]: number;
	};
}

export const ActionsChart = ({ heading, intro, title, link, data }: Props) => {
	const x = Object.keys(data).map((key) => {
		return key;
	});

	const y = Object.values(data).map((value) => {
		return value;
	});

	const text = link ? (
		<div className="text-base sm:text-lg mb-4">
			{intro}{' '}
			<Link href={link} prefetch={false}>
				<a className="bll">See full list.</a>
			</Link>
		</div>
	) : (
		<p className="text-base sm:text-lg mb-4">{intro}</p>
	);

	return (
		<>
			{heading && <h2 className="hh2">{heading}</h2>}
			{text}
			<div className="h-72 sm:h-80 border border-gray-200 p-1 mb-5 sm:mb-6">
				<ActionsChartChart x={x} y={y} title={title} />
			</div>
		</>
	);
};
