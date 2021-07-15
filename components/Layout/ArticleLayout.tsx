import { ReactNode } from 'react';
import Sidebar from './Sidebar/_Sidebar';

interface Props {
	heading: string;
	children: ReactNode;
}

export default function PageLayout({ heading, children }: Props) {
	return (
		<>
			<div className="mx-auto lg:max-w-[1150px] py-6 lg:py-8 px-4 lg:px-6 lg:grid lg:grid-cols-sidebar lg:gap-12">
				<main>
					<article className="text-page lg:px-6">
						<h1>{heading}</h1>
						{children}
					</article>
				</main>
				<Sidebar />
			</div>
		</>
	);
}
