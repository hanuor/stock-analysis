import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';

const Restricted = dynamic(() => import('./Restricted'), {
	ssr: false,
});

interface ExportItemProps {
	title: string;
}

export const ExportItemRestricted = ({ title }: ExportItemProps) => {
	return (
		<Menu.Item>
			<Restricted title={title} />
		</Menu.Item>
	);
};
