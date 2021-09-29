import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';

const Download = dynamic(() => import('./Download'), {
	ssr: false,
});

interface ExportItemProps {
	title: string;
	type: 'csv' | 'xlsx';
	data: string;
	fixValuef?: (n: any) => any;
}

export const ExportItem = ({
	title,
	type,
	data,
	fixValuef,
}: ExportItemProps) => (
	<Menu.Item>
		<Download title={title} type={type} data={data} fixValuef={fixValuef} />
	</Menu.Item>
);
