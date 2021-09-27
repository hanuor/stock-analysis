import ExcellentExport from 'excellentexport';
import { navState } from 'state/navState';

interface Props {
	title: string;
	type: 'csv' | 'xlsx';
	data: any;
	fixValuef: (n: any) => any;
	isTable: boolean;
}

export default function Download({
	title,
	type,
	data,
	isTable,
	fixValuef,
}: Props) {
	const path = navState((state) => state.path);

	const fileName = `${path.one}${path.two ? '-' + path.two : ''}${
		path.three ? '-' + path.three : ''
	}`;

	const returnArray = isTable
		? [
				{
					name: 'Export',

					from: { table: data },
					fixValue: (value: any) => {
						if (value.includes('href=') || value.includes('class=')) {
							// Grab value between > and 2nd <
							const start = value.indexOf('>') + 1;
							const end = value.indexOf('<', 1);
							return value.substring(start, end);
						}
						if (value.includes('title=')) {
							// Grab value between double quotes
							const start = value.indexOf('"') + 1;
							const end = value.lastIndexOf('"');
							return value.substring(start, end);
						}
						return value;
					},
				},
		  ]
		: [
				{
					name: 'Export',

					from: { array: data },
					fixValue: (value: any) => {
						if (value.includes('href=') || value.includes('class=')) {
							// Grab value between > and 2nd <
							const start = value.indexOf('>') + 1;
							const end = value.indexOf('<', 1);
							return value.substring(start, end);
						}
						if (value.includes('title=')) {
							// Grab value between double quotes
							const start = value.indexOf('"') + 1;
							const end = value.lastIndexOf('"');
							return value.substring(start, end);
						}
						return value;
					},
				},
		  ];

	function download(type: 'csv' | 'xlsx') {
		return ExcellentExport.convert(
			{
				openAsDownload: true,
				filename: fileName,
				format: type,
			},
			returnArray
		);
	}

	return (
		<div
			className="text-gray-700 hover:bg-gray-100 block px-4 py-2 text-sm cursor-pointer"
			onClick={() => {
				download(type);
			}}
		>
			{title}
		</div>
	);
}
