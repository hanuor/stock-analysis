import { useState, useEffect } from 'react';
import useUserInfo from 'users/useUserInfo';
import LayoutFullWidth from 'components/Layout/LayoutFullWidth';
import LoginPrompt from 'components/LoginPrompt';
import Head from 'next/head';
import Link from 'next/link';
import { db } from 'users/firebase';
import { formatDateClean } from 'functions/formatDates';

export default function MyAccount() {
	const { user } = useUserInfo();
	const [userMeta, setUserMeta] = useState();

	useEffect(() => {
		if (user && user.uid) {
			db.collection('users')
				.doc(user.uid)
				.get()
				.then((doc) => {
					setUserMeta(doc.data());
				})
				.catch((err) => {
					console.log('getUserMeta error:', err);
				});
		}
	}, [user]);

	return (
		<LayoutFullWidth title="My Account">
			<Head>
				<meta name="robots" content="noindex, nofollow" />
			</Head>
			<div className="max-w-3xl mx-auto px-4 xs:px-6 py-8 xs:py-12 space-y-6 xs:space-y-8">
				{user && userMeta ? (
					<>
						<h1 className="text-3xl xs:text-4xl font-bold mb-5 pb-4 text-gray-800 border-b-2 border-gray-800">
							My Account
						</h1>
						<div className="border border-gray-200 p-3 xs:p-4 rounded-md text-base xs:text-lg">
							<h2 className="hh2">User Information</h2>
							{userMeta.email && (
								<div>
									<strong>Email Address:</strong> {userMeta.email}
								</div>
							)}
							{user.metadata.creationTime && (
								<div>
									<strong>Registered Date:</strong>{' '}
									{formatDateClean(user.metadata.creationTime)}
								</div>
							)}
						</div>
						<div className="border border-gray-200 p-3 xs:p-4 rounded-md text-base xs:text-lg">
							<h2 className="hh2">Manage Subscription</h2>
							{userMeta.status && (
								<div className="mb-2">
									<strong>Status:</strong>{' '}
									{formatSubscriptionStatus(userMeta.status)}
								</div>
							)}
							{userMeta.nextPaymentDate && (
								<div>
									Next Billing Date:{' '}
									{formatDateClean(userMeta.nextPaymentDate)}
								</div>
							)}
							{userMeta.nextPaymentAmount && (
								<div>
									Amount: {userMeta.nextPaymentAmount}{' '}
									{userMeta.paymentCurrency &&
										userMeta.paymentCurrency}
								</div>
							)}
							{userMeta.paymentMethod && (
								<div>
									Payment Method:{' '}
									{userMeta.paymentMethod.charAt(0).toUpperCase() +
										userMeta.paymentMethod.slice(1)}
								</div>
							)}
							{userMeta.urlUpdate && (
								<div>
									<a
										href={userMeta.urlUpdate}
										target="_blank"
										rel="nofollow noopener noreferrer"
										className="bll">
										Update Payment Details
									</a>
								</div>
							)}
							{userMeta.urlCancel && (
								<div className="mt-3">
									<a
										href={userMeta.urlCancel}
										target="_blank"
										rel="nofollow noopener noreferrer"
										className="bll">
										Cancel Subscription
									</a>
								</div>
							)}
						</div>
						<div className="border border-gray-200 p-3 xs:p-4 rounded-md text-base xs:text-lg">
							<h2 className="hh2">Manage Account</h2>
							<div>
								<Link href="/pro/reset-password/">
									<a className="bll">Reset or Change Password</a>
								</Link>
							</div>
						</div>
						<div className="border border-gray-200 p-3 xs:p-4 rounded-md text-base xs:text-lg">
							<h2 className="hh2">Get Support</h2>
							<div className="mb-4">
								<strong>Here&apos;s how to get support:</strong>
							</div>

							<ol className="list-decimal ml-8">
								<li className="mb-2">
									Click the blue chat widget in the bottom right
									corner.
								</li>
								<li className="mb-2">
									Send an email to support@stockanalysis.com.
								</li>
								<li>
									Send a message via the{' '}
									<Link href="/contact/">
										<a className="bll">contact form</a>
									</Link>
									.
								</li>
							</ol>
						</div>
					</>
				) : (
					<LoginPrompt />
				)}
			</div>
		</LayoutFullWidth>
	);
}

function formatSubscriptionStatus(status) {
	switch (status) {
		case 'new':
		case 'trialing':
			return 'Free Trial Active';

		case 'active':
			return 'Subscription Active';

		case 'past_due':
			return 'Payment past due';

		case 'paused':
		case 'deleted':
			return 'Subscription Inactive';

		default:
			return 'n/a';
	}
}
