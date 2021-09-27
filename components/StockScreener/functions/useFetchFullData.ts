import { screenerDataState } from '../screenerdata.state';
import { getData } from 'functions/API';

export function useFetchFullData() {
	const setData = screenerDataState((state) => state.setData);
	const loaded = screenerDataState((state) => state.loaded);
	const setLoaded = screenerDataState((state) => state.setLoaded);
	const setFullyLoaded = screenerDataState((state) => state.setFullyLoaded);

	async function fetchFullData() {
		if (!loaded) {
			setLoaded(true);
			const data = await getData('screener?type=f');
			setData(data.data);
			setFullyLoaded(true);
		}
	}

	return fetchFullData;
}
