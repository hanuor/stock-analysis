type Props = {
	show: string;
	setShow: (value: string) => void;
	setError: (value: string) => void;
	pageType: string;
};

export function NewsMenuNav({ show, setShow, setError, pageType }: Props) {
	return (
		<div className="text-smaller xs:text-base mb-0.5">
			<ul className="flex flex-row space-x-1 bp:space-x-2 sm:space-x-5 whitespace-nowrap">
				<li>
					<button
						className={show === 'all' ? 'font-semibold' : 'bll'}
						id="tag-feat-news-menu-all"
						onClick={() => {
							setError('');
							setShow('all');
						}}
					>
						All
					</button>
				</li>
				<li>
					<button
						className={
							show === 'v' ? 'font-semibold' : 'bll hidden sm:block'
						}
						id="tag-feat-news-menu-videos"
						onClick={() => {
							setError('');
							setShow('v');
						}}
					>
						Videos
					</button>
				</li>
				{pageType === 'stocks' && (
					<li>
						<button
							className={
								show === 'pr' ? 'font-semibold' : 'bll hidden sm:block'
							}
							id="tag-feat-news-menu-press"
							onClick={() => {
								setError('');
								setShow('pr');
							}}
						>
							Press
							<span className="hidden xs:inline"> Releases</span>
						</button>
					</li>
				)}
				<li>
					<button
						className={show === 'chat' ? 'font-semibold' : 'bll'}
						id="tag-feat-news-menu-chat"
						onClick={() => {
							setError('');
							setShow('chat');
						}}
					>
						Conversation
					</button>
				</li>
			</ul>
		</div>
	);
}
