import Meta from '@/components/Meta';
import Header from '@/components/Layout/Header/_Header';
import HeaderLogo from './Header/HeaderLogo';
import Footer from '@/components/Layout/Footer/_Footer';

function UserLayout({ title, children }) {
	return (
		<>
			<Meta title={title}></Meta>
			<Header />
			<div className="max-w-[850px] mx-auto px-6 py-20 sm:px-0 space-y-6">
				<main>
					<HeaderLogo className="h-28 w-28 mx-auto mb-8" />
					<div className="max-w-md mx-auto">{children}</div>
				</main>
			</div>

			<Footer />
		</>
	);
}

export default UserLayout;
