import { FC } from 'react';

export const LayoutFullWidth: FC = ({ children }) => {
	return (
		<>
			<div className="">
				<main>{children}</main>
			</div>
		</>
	);
};
