// Adapted from here: https://github.com/ibrahimcesar/react-lite-youtube-embed
import { useState } from 'react';

interface Props {
	id: string;
	title: string;
}

export const LiteYouTubeEmbed = ({ id, title }: Props) => {
	const [iframe, setIframe] = useState(false);
	const videoId = encodeURIComponent(id);

	const videoTitle = title;
	const posterImp = 'hqdefault';
	const paramsImp = '';
	const posterUrl = `https://i.ytimg.com/vi/${videoId}/${posterImp}.jpg`;

	const ytUrl = 'https://www.youtube-nocookie.com';

	const iframeSrc = `${ytUrl}/embed/${videoId}?autoplay=1${paramsImp}`;

	const onIframeAdded = function () {};

	const addIframe = () => {
		if (iframe) return;
		onIframeAdded();
		setIframe(true);
	};

	const inactive =
		'yt-lite focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-brand_light rounded-sm';
	const active = 'yt-lite lyt-activated';

	return (
		<>
			<div
				onClick={addIframe}
				onKeyDown={(event) => {
					if (event.key === 'Enter') {
						addIframe();
					}
				}}
				className={iframe ? active : inactive}
				data-title={videoTitle}
				style={{ backgroundImage: `url(${posterUrl})` }}
				tabIndex={0}
			>
				<div className="lty-playbtn"></div>
				{iframe && (
					<iframe
						title={videoTitle}
						width="560"
						height="315"
						frameBorder="0"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						src={iframeSrc}
					></iframe>
				)}
			</div>
		</>
	);
};
