import { LockClosedIcon } from '@heroicons/react/solid';
import { useUserInfo } from 'hooks/useUserInfo';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSavedScreens } from './useSavedScreens';

export function SaveScreen() {
	const { status, isPro } = useUserInfo();
	const { add, msg, err, setErr, clearMessages } = useSavedScreens();
	const router = useRouter();
	const [name, setName] = useState('');

	async function handleSubmit(name: string) {
		clearMessages();
		if (status === 'completed' && !isPro) {
			router.push('/pro/');
		} else {
			if (!name) {
				setErr('Please enter a name');
				console.log('no name');
			} else {
				add.mutate(name);
				setName('');
			}
		}
	}

	return (
		<>
			<div className="flex flex-row">
				<input
					type="text"
					placeholder="Enter screen name"
					className="border-gray-200 focus:ring-0 focus:border-blue-300 text-gray-700 text-sm flex-grow"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
						clearMessages();
					}}
				/>
				<button
					className="px-3 bg-gray-500 hover:bg-blue-brand_sharp text-white text-sm font-medium flex items-center"
					onClick={() => handleSubmit(name)}
				>
					Save
					{!isPro && (
						<LockClosedIcon
							className="ml-1 h-4 w-4 text-white"
							aria-hidden="true"
						/>
					)}
				</button>
			</div>
			{msg && (
				<div className="bg-green-50 border-l-2 border-green-400 p-2 text-green-700 text-sm">
					{msg}
				</div>
			)}
			{err && (
				<div className="bg-red-50 border-l-2 border-red-400 p-2 text-red-700 text-sm">
					{err}
				</div>
			)}
		</>
	);
}
