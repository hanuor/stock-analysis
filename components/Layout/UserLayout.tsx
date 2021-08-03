import { FC } from 'react';
import { HeaderLogo } from './Header/HeaderLogo';

export const UserLayout: FC = ({ children }) => {
	return (
		<>
			<div className="max-w-[850px] mx-auto px-6 py-8 sm:py-20 sm:px-0 space-y-6">
				<main id="main">
					<HeaderLogo className="h-24 sm:h-28 w-24 sm:w-28 mx-auto mb-6" />
					<div className="max-w-md mx-auto">{children}</div>
				</main>
			</div>
		</>
	);
};
