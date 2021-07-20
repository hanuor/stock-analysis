import { StatisticType } from 'types/Statistics';
import { FinancialsMapType } from 'types/Financials';
import { Tooltip } from './StatsTooltips';
import styles from './StatsWidget.module.css';

interface Props {
	title: string;
	data: StatisticType;
	map: FinancialsMapType[];
}

export const StatsWidget = ({ title, data, map }: Props) => {
	return (
		<>
			<h2 className="text-xl xs:text-[1.3rem] text-gray-900 mb-2 font-bold px-0.5">
				{title}
			</h2>
			<p className="text-base xs:text-[1.05rem] leading-relaxed lg:leading-normal text-gray-900 mb-4 px-0.5">
				{data.text}
			</p>
			<table className={'text-sm xs:text-base ' + styles.statstable}>
				<tbody>
					{data.data.map((item) => {
						const indicatorInfo = map.find((info) => info.id === item[0]);

						return (
							<tr key={item[0]}>
								<td>
									<Tooltip data={indicatorInfo} indicator={item[1]} />
								</td>
								<td title={item[3]}>{item[2]}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};
