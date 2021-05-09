import { useRouter } from "next/router";

function getRoute() {
	let router = useRouter();

	if (!router.isReady) {
		return;
	}

	let path = router.asPath;
	let split = path.split("/");
	let type = split[1];
	let symbol = split[2];
	let page = split[3] || "overview";
	let subpage = split[4];

	return {
		type,
		symbol,
		page,
		subpage,
	};
}

export default getRoute;
