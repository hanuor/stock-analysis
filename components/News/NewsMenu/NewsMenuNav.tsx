type Props = {
	show: string;
	setShow: (value: string) => void;
	pageType: string;
};

export function NewsMenuNav({ show, setShow, pageType }: Props) {
	return (
		<div className="text-smaller xs:text-base mb-0.5">
			<ul className="flex flex-row justify-between bp:justify-start bp:space-x-5 whitespace-nowrap">
				<li>
					<button
						className={show === 'all' ? 'font-semibold' : 'bll'}
						id="tag-feat-news-menu-all"
						onClick={() => setShow('all')}
					>
						All
					</button>
				</li>
				<li>
					<button
						className={show === 'v' ? 'font-semibold' : 'bll'}
						id="tag-feat-news-menu-videos"
						onClick={() => setShow('v')}
					>
						Videos
					</button>
				</li>
				{pageType === 'stocks' && (
					<li>
						<button
							className={show === 'pr' ? 'font-semibold' : 'bll'}
							id="tag-feat-news-menu-press"
							onClick={() => setShow('pr')}
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
						onClick={() => setShow('chat')}
					>
						Conversation
					</button>
				</li>
			</ul>
		</div>
	);
}
