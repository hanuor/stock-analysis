import { FC } from 'react';

export const LayoutFullWidth: FC = ({ children }) => {
	return (
		<>
			<div>
				<main>{children}</main>
			</div>
		</>
	);
};
