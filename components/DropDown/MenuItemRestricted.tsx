import { Menu } from '@headlessui/react';
import { LockClosedIcon } from '@heroicons/react/solid';

interface MenuItemProps {
	title: string;
	active: boolean;
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

export const MenuItemRestricted = ({ title, active }: MenuItemProps) => (
	<Menu.Item>
		<a
			href="#"
			className={classNames(
				active
					? 'bg-gray-100 text-gray-900'
					: 'text-gray-700 hover:bg-gray-100',
				'flex justify-between items-center px-4 py-2 text-sm'
			)}
		>
			{title}
			<LockClosedIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
		</a>
	</Menu.Item>
);
