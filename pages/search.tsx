import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SEO } from 'components/SEO';
import Script from 'next/script';
import { LayoutSidebar } from 'components/Layout/LayoutSidebar';

export default function Search() {
	const router = useRouter();
	const [query, setQuery] = useState('');

	useEffect(() => {
		if (router.query.q && typeof router.query.q === 'string') {
			setQuery(router.query.q);
		}
	}, [router.query]);

	return (
		<>
			<SEO title="Search Results" canonical="search/" noindex={true} />
			<Script
				src="https://cse.google.com/cse.js?cx=009497841191786531325:usl8eczm65r"
				strategy="afterInteractive"
			/>
			<LayoutSidebar heading={`Search Results for: ${query}`}>
				<div className="min-h-[50vh]">
					<div className="gcse-searchresults-only"></div>
				</div>
			</LayoutSidebar>
		</>
	);
}
