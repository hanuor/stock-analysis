import { SpinnerIcon } from 'components/Icons/Spinner';
import { Success } from 'components/Alerts/Success';

type Props = {
	fn: () => Promise<void>;
	loading: boolean;
	end: boolean;
};

export function ButtonMore({ fn, loading, end }: Props) {
	if (end) {
		return (
			<div className="mt-4">
				<Success message="You have reached the end of the news feed!" />
			</div>
		);
	}

	return (
		<button
			className="mx-auto w-[90%] sm:w-full flex items-center justify-center mt-5 lg:mt-6 px-6 py-3 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
			onClick={fn}
			disabled={loading}
			id={`tag-feat-news-load-${fn.name}`}
		>
			{loading ? (
				<>
					<SpinnerIcon /> Loading...
				</>
			) : (
				'Load More News'
			)}
		</button>
	);
}
