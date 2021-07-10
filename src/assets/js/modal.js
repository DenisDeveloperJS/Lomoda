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
