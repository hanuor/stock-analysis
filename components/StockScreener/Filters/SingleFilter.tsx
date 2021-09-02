interface Props {
	name: string;
}

export function SingleFilter({ name }: Props) {
	return (
		<>
			<div className="inline-flex items-center border border-gray-100 p-1">
				<div>{name}</div>
				<div>
					<select>
						<option>Any</option>
					</select>
				</div>
			</div>
		</>
	);
}
