const renderCard = () => {
	const cartTotalCost = document.querySelector('.cart__total-cost');

	cartListGoods.textContent = '';

	const cardItems = getLocalStorage('cardsData');

	const totalCost = elem => {
		const total = cardItems.reduce((sum, current) => {
			return sum + current.cost;
		}, 0);
		elem.textContent = '';

		elem.textContent += total;
	};

	cardItems.forEach((item, i) => {
		const tr = `
                    <tr>
						<td>${++i}</td>
						<td>
							${item.brand} ${item.name}
						</td>
						<td>${item.color}</td>
						<td>${item.sizes}</td>
						<td>${item.cost} &#8381;</td>
						<td><button class="btn-delete" data-id="${item.id}">&times;</button></td>
					</tr>
        `;
		cartListGoods.innerHTML += tr;
	});

	totalCost(cartTotalCost);
};

const deleteItemCart = id => {
	const cardItem = getLocalStorage('cardsData');

	const newCartItems = cardItem.filter(item => {
		return item.id !== id;
	});

	setLocalStorage('cardsData', newCartItems);
};

cartListGoods.addEventListener('click', e => {
	const target = e.target.closest('.btn-delete');

	if (target) {
		deleteItemCart(target.dataset.id);
		renderCard();
	}
});

cartOverlay.addEventListener('click', closeModal);
