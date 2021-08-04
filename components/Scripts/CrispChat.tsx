import Script from 'next/script';
import { authState } from 'state/authState';

export const CrispChat = () => {
	const email = authState((state) => state.email);
	const isLoggedIn = authState((state) => state.isLoggedIn);

	return (
		<>
			<Script strategy="lazyOnload">
				{`window.$crisp=[];window.CRISP_WEBSITE_ID="462df10f-fb43-4ca4-9537-e0af8a974bba";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}
			</Script>

			{isLoggedIn && (
				<Script strategy="lazyOnload">{`$crisp.push(["set", "user:email", "${email}"])`}</Script>
			)}
		</>
	);
};
