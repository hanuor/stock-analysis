// Taken from here: https://github.com/ibrahimcesar/react-lite-youtube-embed
import { useState } from 'react';
import styles from './LiteYouTubeEmbed.module.css';

export default function LiteYouTubeEmbed(props) {
	const [preconnected, setPreconnected] = useState(false);
	const [iframe, setIframe] = useState(false);
	const videoId = encodeURIComponent(props.id);

	const videoTitle = props.title;
	const posterImp = props.poster || 'hqdefault';
	const paramsImp = `&${props.params}` || '';
	const posterUrl = `https://i.ytimg.com/vi/${videoId}/${posterImp}.jpg`;

	let ytUrl = props.noCookie
		? 'https://www.youtube-nocookie.com'
		: 'https://www.youtube.com';
	ytUrl = props.cookie
		? 'https://www.youtube.com'
		: 'https://www.youtube-nocookie.com';

	const iframeSrc = `${ytUrl}/embed/${videoId}?autoplay=1${paramsImp}`;

	const onIframeAdded = props.onIframeAdded || function () {};

	const warmConnections = () => {
		if (preconnected) return;
		setPreconnected(true);
	};

	const addIframe = () => {
		if (iframe) return;
		onIframeAdded();
		setIframe(true);
	};

	const inactive = styles['yt-lite'];
	const active = [styles['yt-lite'], styles['lyt-activated']].join(' ');

	return (
		<>
			<>
				{preconnected && (
					<>
						<link rel="preconnect" href={ytUrl} />
						<link rel="preconnect" href="https://www.google.com" />
					</>
				)}
			</>
			<div
				onPointerOver={warmConnections}
				onClick={addIframe}
				className={iframe ? active : inactive}
				data-title={videoTitle}
				style={{ backgroundImage: `url(${posterUrl})` }}>
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
						src={iframeSrc}></iframe>
				)}
			</div>
		</>
	);
}
