import { authState } from 'state/authState';
import { noAds } from 'components/Ads/noAds';
import { useNavState } from 'hooks/useNavState';
import { useCallback, useEffect, useState } from 'react';
import Script from 'next/script';

export function HeaderAd() {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);
	const { path } = useNavState();
	const [show, setShow] = useState(true);
	const [staticc, setStaticc] = useState(false);

	const onScroll = useCallback(() => {
		if (window.scrollY > 200) {
			window.removeEventListener('scroll', onScroll);
			setTimeout(() => {
				setShow(false);
				setTimeout(() => {
					setStaticc(true);
				}, 500);
			}, 1000);
		}
	}, []);

	useEffect(() => {
		setShow(true);
		setStaticc(false);
		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [onScroll, path]);

	if (!noAds(path.one)) {
		if (status !== 'completed' || (status === 'completed' && !isPro)) {
			return (
				<div
					className={
						show ? 'sticky-head' : staticc ? '' : 'sticky-head fade-out'
					}
				>
					<div className="hidden md:block bg-gray-100 pt-1 pb-2 mx-auto text-center">
						<div
							className="md:min-h-[111px] md:max-w-[728px] lg:max-w-[970px] mx-auto text-center center-children"
							id="adngin-top_leaderboard-0"
						>
							<div className="text-xxs pt-1">ADVERTISEMENT</div>
							<div
								className="dianomi_context"
								data-dianomi-context-id="789"
							></div>
							<Script
								strategy="lazyOnload"
								src="https://www.dianomi.com/js/contextfeed.js"
								id="dianomi_context_script"
							/>
						</div>
					</div>
				</div>
			);
		}
	}

	return null;
}
