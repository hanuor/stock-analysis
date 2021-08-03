import { LeftRightIcon } from 'components/Icons/LeftRight';
import { DropdownIcon } from 'components/Icons/Dropdown';
import { financialsState } from 'state/financialsState';
import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ExportMenu = dynamic(() => import('./ExportMenu'), {
	ssr: false,
});

interface Props {
	statement: string;
	symbol: string;
}

export const TableControls = ({ statement, symbol }: Props) => {
	const dropdownNode = useRef<HTMLDivElement>(null);
	const [exportOpen, setExportOpen] = useState(false);
	const leftRight = financialsState((state) => state.leftRight);
	const setLeftRight = financialsState((state) => state.setLeftRight);

	const clickOutside = (e: MouseEvent) => {
		const node = dropdownNode.current ?? null;
		const doc = document.querySelector('.dropdown') ?? null;

		if (
			(node && node.contains(e.target as Node)) ||
			(doc && doc.contains(e.target as Node))
		) {
			return;
		}
		setExportOpen(false);
	};

	useEffect(() => {
		if (exportOpen) {
			document.addEventListener('mousedown', clickOutside);
		} else {
			document.removeEventListener('mousedown', clickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', clickOutside);
		};
	}, [exportOpen]);

	const clickLeftRight = () => {
		if (leftRight === 'left') {
			setLeftRight('right');
		} else {
			setLeftRight('left');
		}
	};

	return (
		<div className="hidden sm:flex sm:flex-row sm:space-x-2 pb-2">
			<div className="w-46 relative dropdown">
				<button
					id="expxlxs"
					onClick={() => setExportOpen(!exportOpen)}
					className="bg-gray-100 border border-gray-300 h-12 rounded-sm hover:bg-white focus:outline-none focus:bg-white focus:shadow-md flex flex-row items-center py-1 px-4 font-semibold"
				>
					Export Financials
					<DropdownIcon classes="w-6 h-6 ml-2 -mr-1" />
				</button>
				<div ref={dropdownNode}>
					{exportOpen && (
						<ExportMenu
							statement={statement}
							symbol={symbol}
							setExportOpen={setExportOpen}
						/>
					)}
				</div>
			</div>
			<div>
				<button
					className="bg-gray-100 border border-gray-300 h-12 rounded-sm hover:bg-white focus:outline-none focus:bg-white focus:shadow-md px-3"
					onClick={() => clickLeftRight()}
				>
					<LeftRightIcon classes="h-9 w-9" />
				</button>
			</div>
		</div>
	);
};
