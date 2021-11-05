/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @next/next/no-img-element */
import { authState } from 'state/authState';
import { noAds } from 'components/Ads/noAds';
import { useNavState } from 'hooks/useNavState';
import { useCallback, useEffect, useState } from 'react';
// import Script from 'next/script';

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
							<a
								href="https://www.tradingview.com/?offer_id=10&aff_id=23485&file_id=932"
								target="_blank"
								className="mx-auto text-center"
							>
								<img
									src="https://media.go2speed.org/brand/files/tradingview/10/Trial_EN_728x90.png"
									width="728"
									height="90"
									className="mx-auto text-center"
									// border="0"
								/>
							</a>
							<img
								src="https://tradingview.go2cloud.org/aff_i?offer_id=10&file_id=932&aff_id=23485"
								width="0"
								height="0"
								// style="position:absolute;visibility:hidden;"
								// border="0"
							/>
							{/* <div className="w-[728px] h-[90px] border border-gray-300 bg-blue-100 mx-auto"></div> */}
						</div>
					</div>
				</div>
			);
		}
	}

	return null;
}
