try {
	if (!goodsList) {
		throw 'This is not goods page';
	}

	const createCard = ({ id, preview, cost, name, brand, sizes }) => {
		const li = document.createElement('li');

		li.classList.add('goods__item');
		li.innerHTML = `
                <article class="good">
                <a class="good__link-img" href="card-good.html#${id}">
                    <img
                        class="good__img"
                        src="./assets/images/goods-image/${preview}"
                        alt="${name}"
                    />
                </a>
                <div class="good__description">
                    <p class="good__price">${cost} &#8381;</p>
                    <h3 class="good__title">
                        ${brand}
                        <span class="good__title__grey">/ ${name}</span>
                    </h3>
                    ${
						Array.isArray(sizes)
							? `<p class="good__sizes">
                    Размеры (RUS):
                    <span class="good__sizes-list">${sizes.join(', ')}</span>
                </p>`
							: `<p class="good__sizes">
                            Размеры (RUS):
                            <span class="good__sizes-list">нет</span>
                        </p>`
					}
                    <a class="good__link" href="card-good.html#id56454"
                        >Подробнее</a
                    >
                </div>
                </article>
        `;

		return li;
	};

	const renderGodsList = data => {
		goodsList.textContent = '';

		data.forEach(item => {
			const card = createCard(item);

			goodsList.append(card);
		});
	};

	getGoods(renderGodsList, getHash().substr(1));

	window.addEventListener('hashchange', () => {
		getGoods(renderGodsList, getHash().substr(1));
	});
} catch (e) {}
