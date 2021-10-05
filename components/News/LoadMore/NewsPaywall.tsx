import { Button } from 'components/Button';
import { ButtonWhite } from 'components/ButtonWhite';

export function NewsPaywall() {
	return (
		<div className="mt-3 mb-5 text-center">
			<h4 className="text-3xl font-semibold text-gray-900 mb-2.5">
				Get unlimited news
			</h4>
			<p className="text-gray-700 text-base font-medium mb-0.5">
				Keep scrolling with a free 30-day trial of Stock Analysis Pro
			</p>
			<div className="flex space-x-6 justify-center">
				<Button
					text="Free Trial"
					url="/pro/"
					className="w-44"
					id="tag-upgr-news-below"
				/>
				<ButtonWhite
					text="Sign In"
					url="/login/"
					className="w-44"
					id="tag-upgr-news-below-login"
				/>
			</div>
		</div>
	);
}
