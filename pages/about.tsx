/* eslint-disable @next/next/no-img-element */

import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';
import { SEO } from 'components/SEO';
import { AboutHero } from 'components/About/Hero';
import { AboutFeatures } from 'components/About/Features';
import { AboutTeam } from 'components/About/Team';
import { AboutActions } from 'components/About/Actions';

export default function FrontPage() {
	return (
		<>
			<SEO title="About" description="" canonical="/about/" />
			<LayoutFullWidth>
				<AboutHero />
				<AboutFeatures />
				<AboutTeam />
				<AboutActions />
			</LayoutFullWidth>
		</>
	);
}
