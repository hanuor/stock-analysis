import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';

const Restricted = dynamic(() => import('./Restricted'), {
	ssr: false,
});

interface ExportItemProps {
	title: string;
	type: string;
}

export const ExportItemRestricted = ({ title, type }: ExportItemProps) => {
	return (
		<Menu.Item>
			<Restricted title={title} type={type} />
		</Menu.Item>
	);
};
