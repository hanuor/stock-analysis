import { FormEvent, useState } from 'react';
import { ArticleLayout } from 'components/Layout/ArticleLayout';
import { SEO } from 'components/SEO';
import { Success } from 'components/Alerts/Success';
import { Error } from 'components/Alerts/Error';
import { Warning } from 'components/Alerts/Warning';
import Axios from 'axios';
import { SpinnerIcon } from 'components/Icons/Spinner';
import { validateEmailAddress, validateLength } from 'functions/validation';

interface MessageData {
	[key: string]: string;
}

export default function Contact() {
	return (
		<>
			<SEO
				title="Contact Us"
				description="This page contains a contact form. Use this form if you have questions or suggestions about the content on this site."
				canonical="contact/"
			/>
			<ArticleLayout
				meta={{
					title: 'Contact Us',
					description:
						'This page contains a contact form. Use this form if you have questions or suggestions about the content on this site.',
				}}
			>
				<p>
					We do not provide personalized investment advice. Please contact
					a qualified financial advisor if you have questions about
					specific investments.
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
		</>
	);
}

function ContactForm() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [subject, setSubject] = useState('');
	const [responseType, setResponseType] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [warning, setWarning] = useState<string | null>(null);

	const url =
		'https://stockanalysis.com/wp-json/contact-form-7/v1/contact-forms/61220/feedback';

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		setResponseType(null);
		setWarning(null);

		if (!validateEmailAddress(email)) {
			return setWarning('Please enter a valid email address.');
		}

		if (!validateLength(message, 10)) {
			return setWarning(
				'Your message is too short to be meaningful. Add more details.'
			);
		}

		setLoading(true);
		try {
			const messageData: MessageData = {
				'your-name': name || 'No Name',
				'your-email': email,
				'your-subject': subject || 'No Subject',
				'your-message': message,
			};

			const form = new FormData();

			for (const field in messageData) {
				if (messageData.hasOwnProperty(field)) {
					form.append(field, messageData[field]);
				}
			}

			const res = await Axios.post(url, form);
			const data = res.data;

			if (data.status === 'mail_sent') {
				setResponseType('success');
				setName('');
				setEmail('');
				setSubject('');
				setMessage('');
			} else {
				setResponseType('error');
			}
		} catch (err) {
			console.error({ err });
			setResponseType('error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-white">
			<div className="relative px-2 mx-auto">
				{warning && <Warning message={warning} />}
				<div className="mt-4">
					<form
						action="#"
						method="POST"
						className="space-y-6"
						onSubmit={handleSubmit}
					>
						<div>
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
									value={name}
									onChange={(event) => setName(event.target.value)}
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<div className="mt-1">
								<input
									name="email"
									type="email"
									id="email"
									autoComplete="email"
									required
									className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="subject"
								className="block text-sm font-medium text-gray-700"
							>
								Subject
							</label>
							<div className="mt-1">
								<input
									name="subject"
									type="text"
									id="subject"
									autoComplete="off"
									className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
									value={subject}
									onChange={(event) => setSubject(event.target.value)}
								/>
							</div>
						</div>

						<div>
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
									required
									rows={4}
									className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
									value={message}
									onChange={(event) => setMessage(event.target.value)}
								/>
							</div>
						</div>
						<div className="pt-1">
							<button
								type="submit"
								className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								{loading ? (
									<>
										<SpinnerIcon /> Sending...
									</>
								) : (
									'Send Message'
								)}
							</button>
						</div>
					</form>
				</div>

				{responseType && (
					<div className="my-8">
						{responseType === 'success' ? (
							<Success message="Your message was sent successfully. We will get back to you soon." />
						) : (
							<Error message="There was an error sending your message. Please try again, or send an email directly to support@stockanalysis.com." />
						)}
					</div>
				)}
			</div>
		</div>
	);
}
