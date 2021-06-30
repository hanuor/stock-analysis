import Link from 'next/link';

export default function LoginPrompt() {
	return (
		<div className="">
			<div className="text-2xl font-bold mb-5 pb-4 border-b-2 border-gray-900">
				Whoops! This page is only available for logged in users.
			</div>
			<p className="text-lg mb-4">
				If you already have an account,{' '}
				<Link href="/login/">
					<a className="bll">login here</a>
				</Link>
				.
			</p>
			<p className="text-lg">
				If not, you can sign up for a free 30-day trial to{' '}
				<Link href="/pro/">
					<a className="bll">Stock Analysis Pro</a>
				</Link>
				.
			</p>
		</div>
	);
}
