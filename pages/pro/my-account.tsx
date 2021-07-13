import { authState } from 'state/authState';
import { SEO } from 'components/SEO';
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';
import { LoginPrompt } from 'components/LoginPrompt';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Axios from 'axios';

type StringOrNull = string | null | undefined;

export default function MyAccount() {
	const isLoggedIn = authState((state) => state.isLoggedIn);
	const email = authState((state) => state.email);
	const [registeredDate, setRegisteredDate] = useState<StringOrNull>(null);
	const [status, setStatus] = useState<StringOrNull>(null);
	const [nextPaymentDate, setNextPaymentDate] = useState<StringOrNull>(null);
	const [nextPaymentAmount, setNextPaymentAmount] =
		useState<StringOrNull>(null);
	const [paymentCurrency, setPaymentCurrency] = useState<StringOrNull>(null);
	const [paymentMethod, setPaymentMethod] = useState<StringOrNull>(null);
	const [urlUpdate, setUrlUpdate] = useState<StringOrNull>(null);
	const [urlCancel, setUrlCancel] = useState<StringOrNull>(null);

	useEffect(() => {
		async function getUserDetails() {
			try {
				const res = await Axios.get(
					`https://stockanalysis.com/wp-json/authorize/v1/autologin?JWT=${token}&e=${email}&f=true`
				);
				setRegisteredDate(res.data.registeredDate);
				setStatus(res.data.status);
				setNextPaymentDate(res.data.nextPaymentDate);
				setNextPaymentAmount(res.data.nextPaymentAmount);
				setPaymentCurrency(res.data.paymentCurrency);
				setPaymentMethod(res.data.paymentMethod);
				setUrlUpdate(res.data.urlUpdate);
				setUrlCancel(res.data.urlCancel);
			} catch (err) {
				console.error(err);
			}
		}

		const token = localStorage.getItem('auth');

		if (token) {
			getUserDetails();
		}
	}, [email]);

	return (
		<>
			<SEO title="My Account" canonical="pro/my-account/" noindex={true} />
			<LayoutFullWidth>
				<div className="max-w-3xl mx-auto px-4 xs:px-6 py-8 xs:py-12 space-y-6 xs:space-y-8">
					{isLoggedIn ? (
						<>
							<h1 className="text-3xl xs:text-4xl font-bold mb-5 pb-4 text-gray-800 border-b-2 border-gray-800">
								My Account
							</h1>
							<div className="border border-gray-200 p-3 xs:p-4 rounded-md text-base xs:text-lg">
								<h2 className="hh2">User Information</h2>
								{email && (
									<div>
										<strong>Email Address:</strong> {email}
									</div>
								)}
								{registeredDate && (
									<div>
										<strong>Registered Date:</strong> {registeredDate}
									</div>
								)}
							</div>
							<div className="border border-gray-200 p-3 xs:p-4 rounded-md text-base xs:text-lg">
								<h2 className="hh2">Manage Subscription</h2>
								{status && (
									<div className="mb-2">
										<strong>Status:</strong> {status}
									</div>
								)}
								{nextPaymentDate && (
									<div>Next Billing Date: {nextPaymentDate}</div>
								)}
								{nextPaymentAmount && (
									<div>
										Amount: {nextPaymentAmount}{' '}
										{paymentCurrency && paymentCurrency}
									</div>
								)}
								{paymentMethod && (
									<div>
										Payment Method:{' '}
										{paymentMethod.charAt(0).toUpperCase() +
											paymentMethod.slice(1)}
									</div>
								)}
								{urlUpdate && (
									<div>
										<a
											href={urlUpdate}
											target="_blank"
											rel="nofollow noopener noreferrer"
											className="bll"
										>
											Update Payment Details
										</a>
									</div>
								)}
								{urlCancel && (
									<div className="mt-3">
										<a
											href={urlCancel}
											target="_blank"
											rel="nofollow noopener noreferrer"
											className="bll"
										>
											Cancel Subscription
										</a>
									</div>
								)}
							</div>
							<div className="border border-gray-200 p-3 xs:p-4 rounded-md text-base xs:text-lg">
								<h2 className="hh2">Manage Account</h2>
								<div>
									<a
										href="https://stockanalysis.com/pro-login/?action=lostpassword"
										className="bll"
									>
										Reset or Change Password
									</a>
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
										<Link href="/contact/" prefetch={false}>
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
		</>
	);
}
