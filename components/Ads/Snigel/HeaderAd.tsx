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
		console.log(window.scrollY);
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
								dangerouslySetInnerHTML={{
									__html: `
<a href="https://stockanalysis.com/pro/">
<div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'; background: #2c6288; border: 1px solid #ddd; border-radius: 2px; height: 90px; width: 728px; margin: 0 auto; position: relative; text-align: left;">
    <div style="padding: 8px 20px 10px 20px;">
        <h4 style="margin: 0 0 5px 0; font-size: 1.5rem; color: white; font-weight: 700;">Stock Analysis Pro</h4>
        <div style="font-size: 1.1rem; font-weight: 400; color: #eee;">
            Unlimited access to all our financial data with up to 30 years of
            history.
        </div>
        <div style="position: absolute; top: 32px; right: 20px;">
            <svg
                style="height: 30px; width: 30px;"
                xmlns="http://www.w3.org/2000/svg"
                fill="#FFF"
                viewBox="0 0 24 24"
            >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
        </div>
    </div>
</div>
</a>
`,
								}}
							/>
							{/* <a
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
							/> */}
							{/* <div className="w-[728px] h-[90px] border border-gray-300 bg-blue-100 mx-auto"></div> */}
						</div>
					</div>
				</div>
			);
		}
	}

	return null;
}
