import { useSavedScreens } from './useSavedScreens';
import { FilterId } from 'components/StockScreener/screener.types';
import { SavedItem } from './SavedItem';
import { SaveScreen } from './SaveScreen';

type SavedFilter = {
	id: FilterId;
	name: string;
	value: string;
};

type Screen = {
	name: string;
	id: number;
	filters: SavedFilter[];
};

type Props = {
	type: 'stocks' | 'ipo' | 'etfs';
};

export function SavedDropdown({ type }: Props) {
	const { data } = useSavedScreens(type);

	return (
		<div className="max-h-80 overflow-y-auto overscroll-contain thin-scroll text-smaller">
			<SaveScreen type={type} />
			{data && data.length > 0 ? (
				<>
					<div className="divide-y">
						{data?.map((item: Screen) => (
							<SavedItem key={item.id} name={item.name} type={type} />
						))}
					</div>
				</>
			) : (
				<div className="p-2 text-sm text-gray-700">
					No screens have been saved yet. Choose some filters, then enter a
					screen name and click Save.
				</div>
			)}
		</div>
	);
}
