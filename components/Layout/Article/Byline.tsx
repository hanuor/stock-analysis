import Link from 'next/link';
import { formatDateClean } from 'functions/formatDates';

export const Byline = ({ date }: { date?: string }) => {
	const AboutLink = () => (
		<Link href="/about/" prefetch={false}>
			<a>Kris Gunnars, BSc</a>
		</Link>
	);

	const Date = () => {
		if (date) {
			const formatted = formatDateClean(date);
			return <> | {formatted}</>;
		}
		return <></>;
	};

	return (
		<div>
			<div className="text-gray-600 text-base">
				By <AboutLink />
				<Date />
			</div>
		</div>
	);
};
