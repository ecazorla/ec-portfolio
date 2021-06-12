/* eslint-disable no-undef */

(() => {
	const body = document.querySelector('body');
	const modeCheckbox = document.querySelector('#mode');
	modeCheckbox.addEventListener('click', () => {
		switch (modeCheckbox.checked) {
		case true:
			body.classList.add('dark');
			break;
		
		default:
			body.classList.remove('dark');
			break;
		}
	});
})();
