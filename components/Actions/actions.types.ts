export type Action = {
	date: string;
	name: string;
	symbol: string;
};

export type CellString = {
	cell: {
		value: string;
	};
};

export interface ActionProps {
	year?: string;
	data: {
		data: Action[];
		fullCount: number;
	};
}

export interface ActionStatisticsProps {
	data: {
		annual: {
			[key: string]: number;
		};
		monthly: {
			[key: string]: number;
		};
		years: {
			[key: string]: {
				[key: string]: number;
			};
		};
	};
}

export interface ActionSplitsProps {
	data: {
		annual: {
			forward: {
				[key: string]: number;
			};
			reverse: {
				[key: string]: number;
			};
		};
		monthly: {
			forward: {
				[key: string]: number;
			};
			reverse: {
				[key: string]: number;
			};
		};
		years: {
			forward: {
				[key: string]: {
					[key: string]: number;
				};
			};
			reverse: {
				[key: string]: {
					[key: string]: number;
				};
			};
		};
	};
}
