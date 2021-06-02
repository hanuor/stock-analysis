import fs from 'fs';
import path from 'path';

// Get file paths for top-level pages
export const POST_PATHS = path.join(process.cwd(), 'content');
export const allPostPaths = fs
	.readdirSync(POST_PATHS)
	.filter((path) => /\.mdx?/.test(path));

// Get file paths for financial terms
export const TERM_PATHS = path.join(process.cwd(), 'content/term');
export const allTermPaths = fs
	.readdirSync(TERM_PATHS)
	.filter((path) => /\.mdx?/.test(path));
