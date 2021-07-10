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
