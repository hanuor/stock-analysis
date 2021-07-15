import { UserLayout } from 'components/Layout/UserLayout';
import Head from 'next/head';

export default function Custom404() {
	return (
		<UserLayout>
			<Head>
				<title>404 - Page not found | Stock Analysis</title>
			</Head>
			<div className="hh1 text-center">404 - Page Not Found</div>
			<div className="text-xl text-center leading-relaxed">
				It looks like this page was not found. Maybe try searching?
			</div>
		</UserLayout>
	);
}
