import { SiteSearch } from 'components/Search/SiteSearch';

export const HeaderSearch = () => {
	return (
		<form action="/search/" method="get" role="search">
			<div className="flex items-center relative">
				<SiteSearch nav={true} />
			</div>
		</form>
	);
};
