const main = document.querySelector('main');

const headerCityBtn = document.querySelector('.header__city-button');
const defaultCity = document.querySelector('.header__city-button').textContent;
const headerCityinput = document.querySelector('.header__city-input');
const headerCityinputBtn = document.querySelector('.header__city-form-btn');

const subheaderCart = document.querySelector('.subheader__cart');

const cartOverlay = document.querySelector('.cart-overlay');
const cartBtnClose = document.querySelector('.cart__btn-close');
const cartListGoods = document.querySelector('.cart__list-goods');
const btnDelete = document.querySelector('.btn-delete');

const navigationList = document.querySelector('.navigation__list');

const goodsList = document.querySelector('.goods__list');
const goodsTitle = document.querySelector('.goods__title');

const cardGoodColorList = document.querySelector('.card-good__color-list');
const cardGoodSizesList = document.querySelector('.card-good__sizes-list');
const cardGood = document.querySelector('.card-good');

// Узнать Hash страницы

const getHash = () => {
	const url = new URL(window.location.href);
	const hash = url.hash;

	return hash;
};

const getLocalStorage = key => JSON.parse(localStorage.getItem(key));
const setLocalStorage = (key, value) =>
	localStorage.setItem(key, JSON.stringify(value));

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

const stopAddScroll = () => {
	if (document.body.style.overflow === 'hidden') {
		document.body.style.overflow = 'visible';
	} else {
		document.body.style.overflow = 'hidden';
	}
};

const openModal = () => {
	cartOverlay.classList.add('cart-overlay-open');
	stopAddScroll();
	renderCard();
};

const closeModal = e => {
	const target = e.target;

	if (target === cartOverlay || target === cartBtnClose) {
		cartOverlay.classList.remove('cart-overlay-open');
		stopAddScroll();
	}
};

subheaderCart.addEventListener('click', openModal);

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

if (!getLocalStorage('cardsData')) {
	setLocalStorage('cardsData', []);
}

if (localStorage.getItem('city')) {
	headerCityBtn.textContent = 'Ваш город: ' + localStorage.getItem('city');
}

headerCityBtn.addEventListener('click', () => {
	headerCityinput.classList.toggle('open');
	headerCityinputBtn.classList.toggle('open');

	if (headerCityBtn.textContent !== defaultCity) {
		headerCityinput.placeholder = 'Введит ваш новый город';
	}
});

headerCityinputBtn.addEventListener('click', e => {
	e.preventDefault();

	if (
		headerCityinput.value.trim() &&
		headerCityinput.classList.contains('open')
	) {
		headerCityBtn.textContent = 'Ваш город: ' + headerCityinput.value;
		headerCityinput.classList.remove('open');
		headerCityinputBtn.classList.remove('open');

		localStorage.setItem('city', headerCityinput.value);

		headerCityinput.value = '';
	}
});

main.onclick = () => {
	headerCityinput.classList.remove('open');
	headerCityinputBtn.classList.remove('open');
};

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
