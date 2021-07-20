import { News } from 'types/News';
import { Button } from 'components/Button';

interface Props {
	title: string;
	news: News[];
	button: {
		text: string;
		url: string;
	};
}

export const NewsWidget = ({ title, news, button }: Props) => {
	if (news.length === 0) {
		return null;
	}

	return (
		<div className="border border-gray-200 rounded text-sm p-4">
			<h3 className="hh3">{title}</h3>
			<ul className="text-gray-700">
				{news.map((item, index) => (
					<li key={index} className="mb-3 last:mb-1">
						{item.time}
						{' - '}
						<a
							href={item.url}
							target="_blank"
							rel="noopener noreferrer nofollow"
							className="bll"
						>
							{item.title}
						</a>
						{' - '}
						{item.source}
					</li>
				))}
			</ul>
			<Button text={button.text} url={button.url} />
		</div>
	);
};
