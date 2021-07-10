// Узнать Hash страницы

const getHash = () => {
	const url = new URL(window.location.href);
	const hash = url.hash;

	return hash;
};

if (getHash().match(/#\d|\w{8}/)) {
	const renderGoods = data => {
		const { id, photo, cost, name, brand, sizes, color } = data.find(
			item => {
				return item.id === getHash().substr(1);
			}
		);

		const basket = {
			id,
			name,
			brand,
			cost,
		};

		const createSelect = (arr, list) => {
			arr.forEach(color => {
				const li = document.createElement('li');
				li.className = 'card-good__select-item';

				li.textContent = color;

				list.append(li);
			});

			return list.innerHTML;
		};

		cardGood.textContent = '';

		cardGood.innerHTML = `
    <section class="card-good">
    <div class="container card-good__wrapper">
        <div class="card-good__image-wrapper">
            <img
                class="card-good__image"
                src="./assets/images/goods-image/${photo}"
                alt="${name}"
            />
        </div>
        <div class="card-good__description">
            <h2 class="card-good__title-wrapper">
                <p class="card-good__brand">${brand}</p>
                <p class="card-good__title">${name}</p>
            </h2>
            <p class="card-good__price">${cost} ₽</p>


            ${
				Array.isArray(color)
					? `<div class="card-good__color-wrapper card-good__select__wrapper">
                        <button class="card-good__color card-good__select">
                            Выберите цвет
                        </button>
                        <ul class="card-good__color-list card-good__select-list">
                            ${createSelect(color, cardGoodColorList)}
                        </ul>
                    </div>`
					: ''
			}
            

            ${
				Array.isArray(sizes)
					? `<div class="card-good__sizes-wrapper card-good__select__wrapper">
                        <button class="card-good__sizes card-good__select">
                            Выберите размер
                        </button>
                        <ul class="card-good__sizes-list card-good__select-list">
                            ${createSelect(sizes, cardGoodSizesList)}
                        </ul>
                    </div>`
					: ''
			}

            <button class="card-good__buy">Добавить в корзину</button>
        </div>
    </div>
</section>

        `;

		window.addEventListener('load', () => {
			const cardGoodBuy = document.querySelector('.card-good__buy');
			const cardGoodSelectColor =
				document.querySelector('.card-good__color');
			const cardGoodSelectSizes =
				document.querySelector('.card-good__sizes');

			const defaultTextBuy = cardGoodBuy.textContent;

			cardGoodBuy.addEventListener('click', () => {
				if (color) {
					if (cardGoodSelectColor.innerText === 'Выберите цвет') {
						console.log('color not required');
						cardGoodSelectColor.classList.add(
							'card-good__select__not-required'
						);

						if (
							cardGoodSelectSizes.innerText === 'Выберите размер'
						) {
							cardGoodSelectSizes.classList.add(
								'card-good__select__not-required'
							);
						}

						return false;
					} else {
						basket.color = cardGoodSelectColor.innerText;
					}
				} else {
					basket.color = '-';
				}

				if (sizes) {
					if (cardGoodSelectSizes.innerText === 'Выберите размер') {
						console.log('size not required');

						cardGoodSelectSizes.classList.add(
							'card-good__select__not-required'
						);

						return false;
					} else {
						basket.sizes = cardGoodSelectSizes.innerText;
					}
				} else {
					basket.sizes = '-';
				}

				if (cardGoodSelectSizes) {
					cardGoodSelectSizes.textContent = 'Выберите размер';

					cardGoodSelectSizes.classList.remove(
						'card-good__select__not-required'
					);
				}

				if (cardGoodSelectColor) {
					cardGoodSelectColor.textContent = 'Выберите цвет';

					cardGoodSelectColor.classList.remove(
						'card-good__select__not-required'
					);
				}

				cardGoodBuy.textContent = 'Успешно добавлено в корзину!';

				cardGoodBuy.setAttribute('disabled', 'disabled');

				setTimeout(() => {
					cardGoodBuy.textContent = defaultTextBuy;
					cardGoodBuy.removeAttribute('disabled', 'disabled');
				}, 2500);

				const cardsData = getLocalStorage('cardsData');

				cardsData.push(basket);
				setLocalStorage('cardsData', cardsData);
			});
		});
	};

	getGoods(renderGoods);
}

window.addEventListener('load', () => {
	const cardGoodSelect = document.querySelectorAll('.card-good__select');
	const cardGoodSelectList = document.querySelectorAll(
		'.card-good__select-list'
	);

	const cardGoodSelectColor = document.querySelector('.card-good__color');
	const cardGoodSelectSizes = document.querySelector('.card-good__sizes');

	cardGoodSelect.forEach(btn => {
		btn.addEventListener('click', () => {
			cardGoodSelect.forEach(item => {
				item.classList.remove('card-good__select__open');
			});

			btn.classList.add('card-good__select__open');
		});
	});

	cardGoodSelectList.forEach(ul => {
		ul.addEventListener('click', e => {
			const target = e.target.closest('li');
			const ul = target.parentElement;
			const btn = ul.previousElementSibling;
			const type = btn.classList.contains('card-good__color')
				? 'color'
				: 'sizes';

			btn.classList.remove('card-good__select__open');

			if (target) {
				if (
					target.parentElement.classList.contains(
						'card-good__sizes-list'
					)
				) {
					cardGoodSelectSizes.classList.remove(
						'card-good__select__not-required'
					);
				}

				if (
					target.parentElement.classList.contains(
						'card-good__color-list'
					)
				) {
					cardGoodSelectColor.classList.remove(
						'card-good__select__not-required'
					);
				}

				btn.textContent = target.textContent;
			}
		});
	});
});
