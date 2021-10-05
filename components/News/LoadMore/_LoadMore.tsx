import { authState } from 'state/authState';
import { getData } from 'functions/API';
import { ButtonMore } from './ButtonMore';
import { NewsPaywall } from './NewsPaywall';
import { News } from 'types/News';

type Props = {
	id: number;
	show: string;
	data: News[];
	setData: (data: any) => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
	loaded: boolean;
	setLoaded: (loaded: boolean) => void;
	end: boolean;
	setEnd: (end: boolean) => void;
	setPaywalled: (paywalled: boolean) => void;
	dataPage: number;
	setDataPage: (dataPage: number) => void;
};

export function LoadMore({
	id,
	show,
	data,
	setData,
	loading,
	setLoading,
	loaded,
	setLoaded,
	end,
	setEnd,
	setPaywalled,
	dataPage,
	setDataPage,
}: Props) {
	const isPro = authState((state) => state.isPro);

	async function fetchData() {
		setLoading(true);
		const fresh = await getData(`news?i=${id}&f=${show}&full=true`);
		setLoading(false);
		console.log(fresh);
		setData(fresh);
		setLoaded(true);
		if (fresh.length < 25) {
			setEnd(true);
		}
	}

	async function fetchInfiniteData() {
		const PRO_KEY = process.env.NEXT_PUBLIC_PROKEY ?? null;
		setLoading(true);
		const infinite = await getData(
			`news-infinite?i=${id}&f=${show}&p=${dataPage}&t=${PRO_KEY}`
		);
		setLoading(false);
		setDataPage(dataPage + 1);
		console.log(infinite);
		setData(data.concat(infinite));
		if (infinite.length < 25) {
			setEnd(true);
		}
	}

	if (data.length === 25 && !loaded) {
		return <ButtonMore fn={fetchData} loading={loading} end={end} />;
	}

	if (loaded && data.length === 50 && !isPro) {
		setPaywalled(true);
		return <NewsPaywall />;
	}

	if (loaded && data.length >= 50 && isPro) {
		return <ButtonMore fn={fetchInfiniteData} loading={loading} end={end} />;
	}

	return null;
}
