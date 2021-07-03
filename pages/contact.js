import Link from 'next/link';
import { useState } from 'react';
import { Switch } from '@headlessui/react';
import ArticleLayout from 'components/Layout/ArticleLayout';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Contact() {
	return (
		<ArticleLayout meta={{ heading: 'Contact', title: 'Contact Us' }}>
			<p>
				We do not provide personalized investment advice. Please contact a
				qualified financial advisor if you have questions about specific
				investments.
			</p>
			<ContactForm />
			<h2 className="mt-16">Mailing Address</h2>
			<p>
				Vefir ehf.
				<br />
				Austurkor 102,
				<br />
				203 Kopavogur,
				<br />
				Iceland
			</p>
			<h2>Phone Number</h2>
			<p>Phone number: (+354) 693-9246</p>
		</ArticleLayout>
	);
}

function ContactForm() {
	const [agreed, setAgreed] = useState(false);

	return (
		<div className="bg-white overflow-hidden">
			<div className="relative px-2 mx-auto">
				<div className="mt-4">
					<form
						action="#"
						method="POST"
						className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
					>
						<div className="sm:col-span-2">
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700"
							>
								Name
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="name"
									id="name"
									autoComplete="given-name"
									className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
								/>
							</div>
						</div>
						<div className="sm:col-span-2">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="message"
								className="block text-sm font-medium text-gray-700"
							>
								Message
							</label>
							<div className="mt-1">
								<textarea
									id="message"
									name="message"
									rows={4}
									className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
									defaultValue={''}
								/>
							</div>
						</div>
						<div className="sm:col-span-2">
							<div className="flex items-start">
								<div className="flex-shrink-0">
									<Switch
										checked={agreed}
										onChange={setAgreed}
										className={classNames(
											agreed ? 'bg-blue-600' : 'bg-gray-200',
											'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
										)}
									>
										<span className="sr-only">Agree to policies</span>
										<span
											aria-hidden="true"
											className={classNames(
												agreed ? 'translate-x-5' : 'translate-x-0',
												'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
											)}
										/>
									</Switch>
								</div>
								<div className="ml-3">
									<p className="text-base text-gray-500">
										By selecting this, you agree to the{' '}
										<Link href="/privacy-policy/">
											<a className="font-medium link">
												Privacy Policy.
											</a>
										</Link>
									</p>
								</div>
							</div>
						</div>
						<div className="sm:col-span-2">
							<button
								type="submit"
								className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Send Message
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
