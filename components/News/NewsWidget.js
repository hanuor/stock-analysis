const NewsWidget = ({ news }) => {
	return (
		<div>
			<ul>
				{news.map((item, index) => (
					<li key={index}>{item.title}</li>
				))}
			</ul>
		</div>
	);
};

export default NewsWidget;
