import { SEO } from 'components/SEO';
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';

export default function ThankYou() {
	return (
		<>
			<SEO
				title="Confirmed!"
				canonical="subscribe/confirmed/"
				noindex={true}
			/>
			<LayoutFullWidth>
				<div className="py-20 max-w-screen-md mx-auto px-6">
					<h1 className="hh1 text-4xl mb-5">Confirmed!</h1>
					<p className="text-base md:text-xl mb-5">
						Your subscription to the Stock Analysis newsletter was
						confirmed!
					</p>

					<p className="text-base md:text-xl mb-5">
						You should see the{' '}
						<strong>first email in your inbox now.</strong>
					</p>

					<p className="text-base md:text-xl mb-5">
						{`If you don't see it, please check your spam folder and mark the message as "not spam."`}
					</p>

					<p className="text-base md:text-xl mb-5">
						{`Keep in mind that you can cancel at any time by clicking the unsubscribe link at the bottom of each email.`}
					</p>
				</div>
			</LayoutFullWidth>
		</>
	);
}
