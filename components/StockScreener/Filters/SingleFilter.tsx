interface Props {
	name: string;
}

export function SingleFilter({ name }: Props) {
	return (
		<>
			<div className="inline-flex items-center justify-between border border-gray-100 px-2 py-1">
				<div>{name}</div>
				<div>
					<select className="py-1 border-gray-300 rounded">
						<option>Any</option>
					</select>
				</div>
			</div>
		</>
	);
}
