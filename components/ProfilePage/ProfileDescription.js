const outputHtml = (text) => {
	return { __html: text };
};

const ProfileDescription = ({ text }) => {
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

export default ProfileDescription;
