import fs from 'fs';
import path from 'path';

export const POST_PATHS = path.join(process.cwd(), 'content');

export const allPostPaths = fs
	.readdirSync(POST_PATHS)
	.filter((path) => /\.mdx?/.test(path));
