import Link from 'next/link';
import { InformationCircleIcon } from 'components/Icons/InformationCircle';

export function LaterExplanation() {
	return (
		<div className="pb-1 lg:pb-0">
			<h2 className="hh2 text-[1.4rem] text-gray-800 mb-3 lg:mb-4">
				After Next Week
			</h2>
			<div className="rounded bg-white border border-gray-300 p-3 sm:p-4">
				<div className="sm:flex flex-row items-center sm:space-x-4">
					<div className="float-left mr-1 sm:mr-0 sm:block flex-shrink-0">
						<InformationCircleIcon classes="h-6 sm:h-7 w-6 sm:w-7 text-blue-400" />
					</div>
					<div className="sm:ml-3 flex-1 md:flex md:justify-between">
						<p className="text-base md:text-lg text-gray-900">
							No IPOs have been scheduled after next week. The reason is
							that IPO dates are rarely set more than 7-10 days in
							advance.{' '}
							<Link href="/ipos/filings/" prefetch={false}>
								<a className="bll">View unscheduled IPOs</a>
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
