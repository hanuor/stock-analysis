import { NewsMenuNav } from './NewsMenuNav';
import { NewsMenuSearch } from './NewsMenuSearch';
import { News } from 'types/News';

type Props = {
	show: string;
	setShow: (value: string) => void;
	pageType: string;
	id: number;
	setData: (value: News[]) => void;
};

export function NewsMenu({ show, setShow, pageType, id, setData }: Props) {
	return (
		<div className="flex flex-row justify-between items-center border-b">
			<NewsMenuNav show={show} setShow={setShow} pageType={pageType} />
			<NewsMenuSearch id={id} setData={setData} />
		</div>
	);
}
