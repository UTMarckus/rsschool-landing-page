'use strict';

const menuNav = document.querySelector('.nav');
const burgerButton = document.querySelector('.burger-menu');

burgerButton.addEventListener('click', onBurgerClick);

menuNav.addEventListener('click', onMenuClick);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('_lock')) onMenuClick();
});

function onBurgerClick(event) {
  burgerButton.classList.toggle('_open');
  menuNav.classList.toggle('_open');
  document.body.classList.toggle('_lock');
}

function onMenuClick(event) {
  burgerButton.classList.remove('_open');
  menuNav.classList.remove('_open');
  document.body.classList.remove('_lock')
}
