import { screenerDataState } from '../screenerdata.state';
import { getData } from 'functions/API';

export function useFetchFullData() {
	const data = screenerDataState((state) => state.data);
	const setData = screenerDataState((state) => state.setData);
	const setFullyLoaded = screenerDataState((state) => state.setFullyLoaded);

	async function fetchFullData() {
		if (!data || data.length < 100) {
			const data = await getData('screener?type=f');
			setData(data.data);
			setFullyLoaded(true);
		}
	}

	return fetchFullData;
}

export function useFetchFulIPOData() {
	const data = screenerDataState((state) => state.data);
	const setData = screenerDataState((state) => state.setData);
	const setFullyLoaded = screenerDataState((state) => state.setFullyLoaded);

	async function fetchFullData() {
		if (!data || data.length < 100) {
			const data = await getData('screener?type=ipos');
			setData(data.data);
			setFullyLoaded(true);
		}
	}

	return fetchFullData;
}
