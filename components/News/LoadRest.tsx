import { getData } from 'functions/API';
import { Button } from 'components/Button';
import { News } from 'types/News';

type Props = {
	id: number;
	show: string;
	data: News[];
	setData: (data: any) => void;
	loaded: boolean;
	setLoaded: (loaded: boolean) => void;
};

export function LoadRest({
	id,
	show,
	data,
	setData,
	loaded,
	setLoaded,
}: Props) {
	async function fetchData() {
		const fresh = await getData(`news?i=${id}&f=${show}&full=true`);
		console.log(fresh);
		setData(fresh);
		setLoaded(true);
	}

	if (loaded && data.length === 50) {
		return (
			<div className="border border-gray-200 mt-7 p-6 text-center">
				<h4 className="text-2xl xs:text-3xl font-bold text-gray-900 mb-3">
					Showing the last 50 news items
				</h4>
				<div className="text-xl">
					Get Stock Analysis Pro for unlimited news history
				</div>
				<Button
					text="Start Free Trial"
					url="/pro/"
					className="w-44"
					id="tag-upgr-actions-below"
				/>
			</div>
		);
	}

	if (data.length === 25) {
		return (
			<button
				className="text-2xl font-semibold p-4 border"
				onClick={() => fetchData()}
			>
				Load more news
			</button>
		);
	}

	return null;
}
