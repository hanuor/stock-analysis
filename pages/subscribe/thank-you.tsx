import { SEO } from 'components/SEO';
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';

export default function ThankYou() {
	return (
		<>
			<SEO
				title="Thank you!"
				canonical="/subscribe/thank-you/"
				noindex={true}
			/>
			<LayoutFullWidth>
				<div className="py-20 max-w-screen-md mx-auto px-5 xs:px-6">
					<h1 className="hh1 text-4xl">Thank you!</h1>
					<p className="text-base md:text-xl mb-5">
						Thank you for your interest in the Stock Analysis newsletter!
					</p>

					<p className="text-base md:text-xl mb-5">
						Please open your email and click the verification link in the
						email we just sent you.
					</p>

					<p className="text-base md:text-xl mb-5">
						We want to be absolutely certain that you want to hear from
						us.
					</p>
				</div>
			</LayoutFullWidth>
		</>
	);
}
