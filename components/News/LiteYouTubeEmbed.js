import styles from './LiteYouTubeEmbed.module.css';
import { useState } from 'react';
// Taken from here: https://github.com/ibrahimcesar/react-lite-youtube-embed

export default function LiteYouTubeEmbed(props) {
	const [iframe, setIframe] = useState(false);
	const videoId = encodeURIComponent(props.id);

	const videoTitle = props.title;
	const posterImp = props.poster || 'hqdefault';
	const paramsImp = `&${props.params}` || '';
	const posterUrl = `https://i.ytimg.com/vi/${videoId}/${posterImp}.jpg`;

	const ytUrl = 'https://www.youtube-nocookie.com';

	const iframeSrc = `${ytUrl}/embed/${videoId}?autoplay=1${paramsImp}`;

	const onIframeAdded = props.onIframeAdded || function () {};

	const addIframe = () => {
		if (iframe) return;
		onIframeAdded();
		setIframe(true);
	};

	const inactive = styles['yt-lite'];
	const active = [styles['yt-lite'], styles['lyt-activated']].join(' ');

	return (
		<>
			<div
				onClick={addIframe}
				className={iframe ? active : inactive}
				data-title={videoTitle}
				style={{ backgroundImage: `url(${posterUrl})` }}
			>
				<div className={styles['lty-playbtn']}></div>
				{iframe && (
					<iframe
						className=""
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
}
