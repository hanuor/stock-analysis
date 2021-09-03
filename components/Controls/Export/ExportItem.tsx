import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';

const Download = dynamic(() => import('./Download'), {
	ssr: false,
});

interface ExportItemProps {
	title: string;
	type: 'csv' | 'xlsx';
	tableId: string;
}

export const ExportItem = ({ title, type, tableId }: ExportItemProps) => (
	<Menu.Item>
		<Download title={title} type={type} tableId={tableId} />
	</Menu.Item>
);
