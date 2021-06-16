import Link from 'next/link';
import Button from '@/components/Button';
import { stockState } from '@State/stockState';

export default function Profile() {
	const info = stockState((state) => state.info);
	const data = stockState((state) => state.data);

	return (
		<div className="text-gray-900">
			<h2 className="hh2 mb-2">About {info.ticker}</h2>
			<p>
				{data.description}{' '}
				<Link href={`/stocks/${info.symbol}/company/`}>
					<a className="bll">[Read more...]</a>
				</Link>
			</p>

			<div className="mt-3 grid grid-cols-2 gap-3">
				{data.infoTable &&
					Object.keys(data.infoTable).map(function (number, index) {
						return (
							<div key={index}>
								<span className="font-semibold block">
									{data.infoTable[number][0]}
								</span>
								<span>{data.infoTable[number][1]}</span>
							</div>
						);
					})}
			</div>

			<Button
				url={`/stocks/${info.symbol}/company/`}
				text="Full Company Profile"
			/>
		</div>
	);
}
