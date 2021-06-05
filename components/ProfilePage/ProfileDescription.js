const outputHtml = (text) => {
	return { __html: text };
};

const ProfileDescription = ({ text }) => {
	return <div dangerouslySetInnerHTML={outputHtml(text)} />;
};

export default ProfileDescription;
