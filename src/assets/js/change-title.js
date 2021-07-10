navigationList.addEventListener('click', e => {
	const li = e.target.closest('li');

	if (li) {
		goodsTitle.textContent = li.textContent;
	}
});

const changeTitle = () => {
	switch (getHash().substr(1)) {
		case 'women':
			goodsTitle.textContent = 'Женщинам';
			break;
		case 'man':
			goodsTitle.textContent = 'Мужчинам';
			break;
		case 'kids':
			goodsTitle.textContent = 'Детям';
			break;
	}
};
