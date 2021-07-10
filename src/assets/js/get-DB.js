const getData = async () => {
	const responce = await fetch('db.json', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});

	const data = await responce.json();

	return data;
};

const getGoods = (callback = function () {}, value) => {
	getData()
		.then(data => {
			if (value) {
				callback(data.filter(item => item.category === value));
			} else {
				callback(data);
			}
		})
		.catch(err => {
			console.error(err);
		});
};
