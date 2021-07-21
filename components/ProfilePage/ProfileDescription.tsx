const outputHtml = (text: string) => {
	return { __html: text };
};

export const ProfileDescription = ({ text }: { text: string }) => {
	return (
		<>
			<h2 className="hh2">Company Description</h2>
			<div
				className="text-page"
				dangerouslySetInnerHTML={outputHtml(text)}
			/>
		</>
	);
};
