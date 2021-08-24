import { Menu } from '@headlessui/react';

interface MenuItemProps {
	title: string;
	active: boolean;
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

export const MenuItem = ({ title, active }: MenuItemProps) => (
	<Menu.Item>
		<a
			href="#"
			className={classNames(
				active
					? 'bg-gray-100 text-gray-900'
					: 'text-gray-700 hover:bg-gray-100',
				'block px-4 py-2 text-sm'
			)}
		>
			{title}
		</a>
	</Menu.Item>
);
