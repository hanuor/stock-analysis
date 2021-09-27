import { screenerDataState } from '../screenerdata.state';
import { getData } from 'functions/API';
import { Dispatch, SetStateAction } from 'react';
import { SingleStock } from '../screener.types';

export function useFetchFullData() {
	const setData = screenerDataState((state) => state.setData);
	const loaded = screenerDataState((state) => state.loaded);
	const setLoaded = screenerDataState((state) => state.setLoaded);
	const setFullyLoaded = screenerDataState((state) => state.setFullyLoaded);

	async function fetchFullData(
		setUseData: Dispatch<SetStateAction<SingleStock[]>>
	) {
		if (!loaded) {
			setLoaded(true);
			const data = await getData('screener?type=f');
			setData(data.data);
			setUseData(data.data);
			setFullyLoaded(true);
		}
	}

	return fetchFullData;
}
