import styles from './StatsWidget.module.css';
import Tooltip from './StatsTooltips';

const StatsWidget = ({ title, text, data, map }) => (
	<>
		<h2 className="text-xl font-bold mb-1.5">{title}</h2>
		<p className="text-base mb-3">{text}</p>
		<table className={styles.statstable}>
			<tbody>
				{data.map((item) => {
					let indicator_info = map.find((info) => info.id === item[0]);

					return (
						<tr key={item[0]}>
							<td>
								<Tooltip data={indicator_info} indicator={item[1]} />
							</td>
							<td title={item[3]}>{item[2]}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	</>
);

export default StatsWidget;
