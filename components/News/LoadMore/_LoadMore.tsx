import { authState } from 'state/authState';
import { getData } from 'functions/API';
import { ButtonMore } from './ButtonMore';
import { NewsPaywall } from './NewsPaywall';
import { News } from 'types/News';
import { useEffect } from 'react';

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
	searched: boolean;
	query: string;
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
	searched,
	query,
}: Props) {
	const isPro = authState((state) => state.isPro);

	useEffect(() => {
		if (loaded && data.length === 50 && !isPro) {
			setPaywalled(true);
		}
	}, [loaded, data, isPro, setPaywalled]);

	async function fetchData() {
		setLoading(true);
		const fresh = await getData(`news?i=${id}&f=${show}&full=true`);
		setLoading(false);
		setData(fresh);
		setLoaded(true);
		if (fresh.length < 25) {
			setEnd(true);
		}
	}

	async function fetchInfiniteData() {
		const PRO_KEY = process.env.NEXT_PUBLIC_PROKEY ?? null;
		setLoading(true);

		let infinite =
			searched && query.length > 0
				? await getData(
						`news-search?i=${id}&q=${query}&p=${dataPage}&t=${PRO_KEY}`
				  )
				: await getData(
						`news-infinite?i=${id}&f=${show}&p=${dataPage}&t=${PRO_KEY}`
				  );

		if (infinite.data) {
			infinite = infinite.data;
		}

		setLoading(false);
		setDataPage(dataPage + 1);

		setData(data.concat(infinite));
		if (infinite.length < 25) {
			setEnd(true);
		}
	}

	if (data.length === 25 && !loaded) {
		return (
			<ButtonMore
				fn={fetchData}
				tag="fetchData"
				loading={loading}
				end={end}
			/>
		);
	}

	if (loaded && data.length === 50 && !isPro) {
		return <NewsPaywall />;
	}

	if (loaded && data.length >= 50 && isPro) {
		return (
			<ButtonMore
				fn={fetchInfiniteData}
				tag="fetchDataPro"
				loading={loading}
				end={end}
			/>
		);
	}

	return null;
}
