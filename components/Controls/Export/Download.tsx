import ExcellentExport from 'excellentexport';
import { navState } from 'state/navState';
import { extractTextFromHTML, removeNanValues } from './extractText';

interface Props {
	title: string;
	type: 'csv' | 'xlsx';
	data: any;
}

export default function Download({ title, type, data }: Props) {
	const path = navState((state) => state.path);

	const fileName = `${path.one}${path.two ? '-' + path.two : ''}${
		path.three ? '-' + path.three : ''
	}`;

	const returnArray =
		typeof data === 'string'
			? [
					{
						name: 'Export',
						from: { table: data },
						fixValue: extractTextFromHTML,
					},
			  ]
			: [
					{
						name: 'Export',
						from: { array: data },
						fixValue: removeNanValues,
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
