import { FC } from 'react';

export const LayoutFullWidth: FC = ({ children }) => {
	return (
		<>
			<div>
				<main id="main">{children}</main>
			</div>
		</>
	);
};
