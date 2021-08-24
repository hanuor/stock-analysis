import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';

const Download = dynamic(() => import('./Download'), {
	ssr: false,
});

interface ExportItemProps {
	title: string;
	type: 'csv' | 'xlsx';
}

export const ExportItem = ({ title, type }: ExportItemProps) => (
	<Menu.Item>
		<Download title={title} type={type} />
	</Menu.Item>
);
