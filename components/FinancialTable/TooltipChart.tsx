import HeadlessTippy, { TippyProps } from '@tippyjs/react/headless';

export const TooltipChart = (props: JSX.IntrinsicAttributes & TippyProps) => {
	return <HeadlessTippy {...props}></HeadlessTippy>;
};
