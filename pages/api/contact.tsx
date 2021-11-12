import type { NextApiRequest, NextApiResponse } from 'next';
const postmark = require('postmark');

const KEY = process.env.POSTMARK_SERVER_API_TOKEN || '';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const client = new postmark.Client(KEY);
	const { name, email, subject, message } = req.body;

	const from = `${name} <no-reply@stockanalysis.com>`;
	const textBody = `From: ${name} (${email})\n\n${message}`;

	const obj = {
		From: from,
		ReplyTo: email,
		To: 'contact@stockanalysis.com',
		Subject: subject,
		TextBody: textBody,
	};

	const send = await client.sendEmail(obj);

	if (send.Message === 'OK' && send.ErrorCode === 0) {
		res.status(200).json({ status: 'email_sent' });
	} else {
		res.status(400).json({ status: 'error', code: send.ErrorCode });
	}
}
