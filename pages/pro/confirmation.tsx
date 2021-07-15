import { SEO } from 'components/SEO';
import { UserLayout } from 'components/Layout/UserLayout';

export default function FreeTrial() {
	return (
		<>
			<SEO
				title="Confirmation"
				canonical="pro/confirmation/"
				noindex={true}
			/>
			<UserLayout>
				<div className="space-y-6">
					<h1 className="text-4xl font-bold mb-5 text-gray-800">
						Free Trial Confirmed
					</h1>

					<p className="text-lg sm:text-xl text-gray-900 leading-relaxed">
						Congrats, your free trial subscription has been activated!
					</p>
					<p className="text-lg sm:text-xl text-gray-900 leading-relaxed">
						Please check your email now -- it contains a link to create
						your password.
					</p>
					<p className="text-lg sm:text-xl text-gray-900 leading-relaxed">
						After that, you can use your email and password to log in to
						the site.
					</p>
					<p className="text-lg sm:text-xl text-gray-900 leading-relaxed">
						If you have any problems, reply to the email or send a message
						to support@stockanalysis.com.
					</p>
					<p className="text-lg sm:text-xl text-gray-900 leading-relaxed">
						Best,
						<br />
						The Stock Analysis Team
					</p>
				</div>
			</UserLayout>
		</>
	);
}
