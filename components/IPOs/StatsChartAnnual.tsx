import { StatsChart } from './StatsChart';

interface Props {
	title: string;
	data: number;
}

export const StatsChartAnnual = ({ title, data }: Props) => {
	const y = [
		397,
		141,
		183,
		148,
		314,
		286,
		220,
		268,
		62,
		79,
		190,
		171,
		157,
		251,
		304,
		206,
		133,
		217,
		255,
		232,
		480,
		data,
	];
	const x = [
		'2000',
		'2001',
		'2002',
		'2003',
		'2004',
		'2005',
		'2006',
		'2007',
		'2008',
		'2009',
		'2010',
		'2011',
		'2012',
		'2013',
		'2014',
		'2015',
		'2016',
		'2017',
		'2018',
		'2019',
		'2020',
		'2021',
	];

	return <StatsChart title={title} x={x} y={y} />;
};
