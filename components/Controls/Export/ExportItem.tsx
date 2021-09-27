import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';

const Download = dynamic(() => import('./Download'), {
	ssr: false,
});

interface ExportItemProps {
	title: string;
	type: 'csv' | 'xlsx';
	data: string;
	isTable: boolean;
	fixValuef: (n: any) => any;
}

export const ExportItem = ({
	title,
	type,
	data,
	isTable,
	fixValuef,
}: ExportItemProps) => (
	<Menu.Item>
		<Download
			title={title}
			type={type}
			data={data}
			isTable={isTable}
			fixValuef={fixValuef}
		/>
	</Menu.Item>
);
