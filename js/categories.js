'use strict';

async function loadJSON(callback) {
  try {
    const response = await fetch('./js/products.json');
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

loadJSON(renderCategory);

function renderCategory(data) {
  const coffeeArray = data.filter(el => el.category === "coffee");
  const teaArray = data.filter(el => el.category === "tea");
  const dessertArray = data.filter(el => el.category === "dessert");

  const categoriesButtons = document.querySelector('.menu-categories');
  const coffeeBtn = document.querySelector('.btn-coffee');
  const teaBtn = document.querySelector('.btn-tea');
  const dessertBtn = document.querySelector('.btn-dessert');
  const cardsContainer = document.querySelector('.menu-cards');
  const refreshBtn = document.querySelector('.menu-refresh-btn');

  let currentCategory = 0;

  setActiveCategory();
  addCards()

  categoriesButtons.addEventListener('click', changeCurrentCategory);

  refreshBtn.addEventListener('click', refreshCards);

  function setActiveCategory() {
    switch (currentCategory) {
      case 0: {
        coffeeBtn.classList.add('btn_active');
        teaBtn.classList.remove('btn_active');
        dessertBtn.classList.remove('btn_active');
        break;
      }
      case 1: {
        coffeeBtn.classList.remove('btn_active');
        teaBtn.classList.add('btn_active');
        dessertBtn.classList.remove('btn_active');
        break;
      }
      case 2: {
        coffeeBtn.classList.remove('btn_active');
        teaBtn.classList.remove('btn_active');
        dessertBtn.classList.add('btn_active');
        break;
      }
    }
  }

  function changeCurrentCategory(event) {
    if (!!event.target.closest('.btn-coffee')) currentCategory = 0;
    if (!!event.target.closest('.btn-tea')) currentCategory = 1;
    if (!!event.target.closest('.btn-dessert')) currentCategory = 2;

    setActiveCategory();
    addCards();
  }

  function clearCardsContainer() {
    cardsContainer.innerHTML = "";
  }

  function addCards() {
    const items = (currentCategory === 0) ? coffeeArray : (currentCategory === 1) ? teaArray : dessertArray;
    const container = new DocumentFragment();

    for (let i = 0; i < items.length; i++) {
      const card = createCard(items[i])
      if (i >= 4) card.classList.add('card-hidden');
      container.append(card);
    }

    clearCardsContainer();
    cardsContainer.append(container);
    if (items.length <= 4) {
      refreshBtn.style.display = 'none';
    } else {
      refreshBtn.style.display = '';
    }
  }

  function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('menu-card');
    card.classList.add('card');

    const cardImg = document.createElement('div');
    cardImg.classList.add('card-img');

    const img = document.createElement('img');
    img.src = item.image;
    cardImg.append(img);

    card.append(cardImg);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = item.name;
    cardContent.append(cardTitle);

    const cardText = document.createElement('p');
    cardText.classList.add('card-txt');
    cardText.textContent = item.description;
    cardContent.append(cardText);

    const cardPrice = document.createElement('p');
    cardPrice.classList.add('card-price');
    cardPrice.textContent = item.price;
    cardContent.append(cardPrice);

    card.append(cardContent);

    return card;
  }

  function refreshCards() {
    const cards = document.querySelectorAll('.card');
    if (cards.length >= 4) {
      cards.forEach((card) =>
        card.classList.toggle('card-hidden')
      );
    }
  }
}
