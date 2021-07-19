import SiteSearch from 'components/Search/SiteSearch';

export const HeaderSearch = () => {
	return (
		<div className="flex relative">
			<SiteSearch nav={true} />
		</div>
	);
};
