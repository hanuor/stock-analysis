import Tippy, { TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

export const Tooltip = (props: JSX.IntrinsicAttributes & TippyProps) => {
	return <Tippy {...props}></Tippy>;
};
