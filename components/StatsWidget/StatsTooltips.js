import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import styles from './StatsWidget.module.css';

const TooltipContent = ({ data }) => {
	return (
		<div>
			<h4 className="text-xl font-semibold mb-2">{data.title}</h4>
			<div className="border-t border-gray-300 pt-2">{data.tooltip}</div>
			{data.formula && (
				<div className="text-sm border-t border-gray-300 mt-3 pt-2">
					{data.formula}
				</div>
			)}
		</div>
	);
};

const Tooltip = ({ data, indicator }) => {
	return (
		<Tippy
			theme="light"
			delay={100}
			className={styles.bigTooltipText}
			content={<TooltipContent data={data} />}>
			<span>{indicator}</span>
		</Tippy>
	);
};

export default Tooltip;
