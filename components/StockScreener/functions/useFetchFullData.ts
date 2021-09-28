import { screenerDataState } from '../screenerdata.state';
import { getData } from 'functions/API';

export function useFetchFullData() {
	const setData = screenerDataState((state) => state.setData);
	const setFullyLoaded = screenerDataState((state) => state.setFullyLoaded);

	async function fetchFullData() {
		const data = await getData('screener?type=f');
		setData(data.data);
		setFullyLoaded(true);
	}

	return fetchFullData;
}
