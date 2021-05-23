const menuBtn = "shadow-sm py-2 px-3 text-left bg-white hover:bg-gray-100";

export const ExportMenu = () => (
	<div className="absolute right-0 flex flex-col w-full shadow-lg border border-gray-200 rounded-md dropdown-menu">
		<button className={menuBtn}>Export to Excel</button>
		<button className={menuBtn}>Export to CSV</button>
		<button className={menuBtn}>Export to Text</button>
		<button className={menuBtn}>Export to JSON</button>
	</div>
);
