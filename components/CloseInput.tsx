import { CloseIcon } from 'components/Icons/Close';

type Props = {
	search: string;
	setSearch: (search: string) => void;
};

/**
 * A close icon that clears an input field, used for filter and search boxes
 * @param {string} search - The current search string
 * @param {function} setSearch - The function to set the search string
 * @return {JSX.Element | null}
 */
export function CloseInput({ search, setSearch }: Props) {
	if (search === '' || search.length === 0) {
		return null;
	}

	return (
		<div className="absolute right-[7px] xs:right-[10px]">
			<span
				aria-label="Clear"
				title="Clear"
				tabIndex={0}
				onClick={() => {
					setSearch('');
				}}
				onKeyPress={(e) => {
					if (e.key === 'Enter') {
						setSearch('');
					}
				}}
			>
				<CloseIcon classes="h-4 w-4 xs:h-4 xs:w-5 text-gray-600 hover:text-blue-500" />
			</span>
		</div>
	);
}
