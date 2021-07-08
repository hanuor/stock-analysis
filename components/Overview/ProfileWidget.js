import Link from 'next/link';
import Button from 'components/Button';
import { stockState } from 'state/stockState';

export default function Profile() {
	const info = stockState((state) => state.info);
	const data = stockState((state) => state.data);

	return (
		<div className="text-gray-900">
			<h2 className="hh2 mb-2">About {info.ticker}</h2>
			<p>
				{data.description}{' '}
				{info.type === 'stocks' && (
					<Link href={`/stocks/${info.symbol}/company/`} prefetch={false}>
						<a className="bll">[Read more...]</a>
					</Link>
				)}
			</p>

			<div className="mt-3 grid grid-cols-2 gap-3">
				{data.infoTable &&
					Object.keys(data.infoTable).map(function (number, index) {
						return (
							<div
								key={index}
								className={
									info.type === 'etf' &&
									data.infoTable[number][0] === 'Index Tracked'
										? 'col-span-2'
										: 'col-span-1'
								}
							>
								<span className="font-semibold block">
									{data.infoTable[number][0]}
								</span>
								<span>{data.infoTable[number][1]}</span>
							</div>
						);
					})}
			</div>

			{info.type === 'stocks' && (
				<Button
					url={`/stocks/${info.symbol}/company/`}
					text="Full Company Profile"
				/>
			)}
		</div>
	);
}