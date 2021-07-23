import { SEO } from 'components/SEO';
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';

export default function ThankYou() {
	return (
		<>
			<SEO
				title="Thanks again!"
				canonical="subscribe/confirmed/"
				noindex={true}
			/>
			<LayoutFullWidth>
				<div className="py-20 max-w-screen-md mx-auto px-6">
					<h1 className="hh1 text-4xl">Thanks again!</h1>
					<p className="text-base md:text-xl mb-5">
						Your subscription to the Stock Analysis newsletter was
						confirmed!
					</p>

					<p className="text-base md:text-xl mb-5">
						You will now start receiving the newsletter.
					</p>

					<p className="text-base md:text-xl mb-5">
						Keep in mind that you can cancel at any time by clicking the
						“unsubscribe” link at the bottom of each email.
					</p>
				</div>
			</LayoutFullWidth>
		</>
	);
}
