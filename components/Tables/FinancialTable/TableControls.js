import { LeftRightSwitch, MenuDropDown } from "@/components/Icons";
import { ExportMenu } from "./TableControls/ExportMenu";

import { useState } from "react";

const btnStyles =
	"bg-gray-100 border border-gray-300 h-12 rounded-sm hover:bg-white focus:outline-none focus:bg-white focus:shadow-md";

export default function TableControls() {
	const [exportOpen, setExportOpen] = useState(false);

	return (
		<div className="flex flex-row space-x-2 pb-2">
			<div className="w-46 relative dropdown">
				<button
					id="expxlxs"
					onClick={() => setExportOpen(!exportOpen)}
					onBlur={() => setExportOpen(false)}
					className={
						btnStyles +
						" flex flex-row items-center py-1 px-4 font-semibold"
					}>
					Export Financials
					<MenuDropDown classes="w-6 h-6 ml-2 -mr-1" />
				</button>
				{exportOpen && <ExportMenu />}
			</div>
			<div>
				<button className={btnStyles + " px-3"}>
					<LeftRightSwitch classes="h-9 w-9" />
				</button>
			</div>
		</div>
	);
}
