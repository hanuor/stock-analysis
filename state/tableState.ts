import create from 'zustand';

interface TableState {
	tablePage: number;
	tableSize: number;
	setTablePage: (newTablePage: number) => void;
	setTableSize: (tableSize: number) => void;
}

export const tableState = create<TableState>((set) => ({
	tablePage: 0,
	tableSize: 500,
	setTablePage: (newTablePage) => set({ tablePage: newTablePage }),
	setTableSize: (newTableSize) => set({ tableSize: newTableSize }),
}));
