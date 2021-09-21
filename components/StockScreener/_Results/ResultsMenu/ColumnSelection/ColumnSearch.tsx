import { CloseInput } from 'components/CloseInput';

type Props = {
	search: string;
	setSearch: (search: string) => void;
};

/**
 * The search box inside the custom column dropdown
 * @param {string} search
 * @param {function} setSearch
 * @return {JSX.Element}
 * TODO make the input focus automatically when the dropdown is opened
 * TODO add keyboard controls
 */
export function ColumnSearch({ search, setSearch }: Props) {
	return (
		<div className="relative flex items-center">
			<input
				type="text"
				className="border-0 border-b border-gray-200 w-full focus:ring-0 focus:border-gray-200"
				placeholder="Search..."
				value={search}
				onChange={(e) => setSearch(e.target.value.toLowerCase())}
			/>
			<CloseInput search={search} setSearch={setSearch} />
		</div>
	);
}
