const outputHtml = (text) => {
	return { __html: text };
};

const ProfileDescription = ({ text }) => {
	return (
		<>
			<h2 className="text-2xl font-bold mb-3">Company Description</h2>
			<div dangerouslySetInnerHTML={outputHtml(text)} />
			<style global jsx>{`
				p {
					font-size: 1.05rem;
					line-height: 1.55;
					margin-bottom: 1rem;
					color: #222;
				}
				@media screen and (max-width: 500px) {
					p {
						font-size: 1rem;
					}
				}
			`}</style>
		</>
	);
};

export default ProfileDescription;
