'use strict';

async function loadJSON(callback) {
  try {
    const response = await fetch('./js/products.json');
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error('Error:', error);
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

  const modal = document.querySelector('.modal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalImg = document.querySelector('.modal-img');
  const modalTitle = document.querySelector('.modal-title');
  const modalTxt = document.querySelector('.modal-txt');
  const modalSizeList = document.querySelector('.modal-size-list');
  const modalAdditivesList = document.querySelector('.modal-additives-list');
  const modalPrice = document.querySelector('.modal-price');

  let currentCategory = 0;
  let currentItem = null;
  let selectedSize = null;
  let selectedAdditives = [];

  setActiveCategory();
  addCards()

  categoriesButtons.addEventListener('click', changeCurrentCategory);

  refreshBtn.addEventListener('click', refreshCards);

  modal.addEventListener('click', closeModalByOverlay);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('_open')) closeModal();
  });

  modalCloseBtn.addEventListener('click', closeModal);
  modalSizeList.addEventListener('click', changeSize);
  modalAdditivesList.addEventListener('click', changeAdditives);

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

    card.addEventListener('click', () => openModal(item));

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

  function openModal(item) {
    currentItem = item;
    selectedSize = Object.keys(item.sizes)[0];
    selectedAdditives = [];

    modalTitle.textContent = item.name;
    modalTxt.textContent = item.description;

    renderModalImg();
    renderSizeOptions();
    renderAdditivesOptions();
    updateTotalPrice();

    modal.classList.add('_open');
    document.body.classList.add('_lock');
  }

  function closeModal() {
    modal.classList.remove('_open');
    document.body.classList.remove('_lock');
  }

  function closeModalByOverlay(event) {
    if (event.target === modal) closeModal();
  }

  function renderModalImg() {
    const img = document.createElement('img');
    img.src = currentItem.image;
    img.alt = currentItem.name;

    modalImg.innerHTML = '';
    modalImg.append(img);
  }

  function renderSizeOptions() {
    const container = new DocumentFragment();

    Object.keys(currentItem.sizes).forEach((size) => {
      const sizeBtn = document.createElement('button');
      sizeBtn.classList.add('modal-size-btn');
      sizeBtn.dataset.size = size;
      sizeBtn.innerHTML = `<span>${size}</span>${currentItem.sizes[size].size}`;
      if (size === selectedSize) sizeBtn.classList.add('modal-size-btn_active');
      container.append(sizeBtn);
    });

    modalSizeList.innerHTML = '';
    modalSizeList.append(container);
  }

  function renderAdditivesOptions() {
    const container = new DocumentFragment();

    currentItem.additives.forEach((additive, index) => {
      const additiveBtn = document.createElement('button');
      additiveBtn.classList.add('modal-additive-btn');
      additiveBtn.dataset.name = additive.name;

      const additiveNum = document.createElement('span');
      additiveNum.classList.add('modal-additive-num');
      additiveNum.textContent = index + 1;
      additiveBtn.append(additiveNum);

      const additiveTxt = document.createElement('span');
      additiveTxt.classList.add('modal-additive-txt');
      additiveTxt.textContent = additive.name;
      additiveBtn.append(additiveTxt);

      container.append(additiveBtn);
    });

    modalAdditivesList.innerHTML = '';
    modalAdditivesList.append(container);
  }

  function changeSize(event) {
    const sizeBtn = event.target.closest('.modal-size-btn');
    if (!sizeBtn) return;

    selectedSize = sizeBtn.dataset.size;

    modalSizeList.querySelectorAll('.modal-size-btn').forEach((btn) => {
      btn.classList.toggle('modal-size-btn_active', btn === sizeBtn);
    });

    updateTotalPrice();
  }

  function changeAdditives(event) {
    const additiveBtn = event.target.closest('.modal-additive-btn');
    if (!additiveBtn) return;

    const additiveName = additiveBtn.dataset.name;

    if (selectedAdditives.includes(additiveName)) {
      selectedAdditives = selectedAdditives.filter((name) => name !== additiveName);
    } else {
      selectedAdditives.push(additiveName);
    }

    additiveBtn.classList.toggle('modal-additive-btn_active');
    updateTotalPrice();
  }

  function updateTotalPrice() {
    let total = Number(currentItem.price);
    total += Number(currentItem.sizes[selectedSize]['add-price']);

    currentItem.additives.forEach((additive) => {
      if (selectedAdditives.includes(additive.name)) {
        total += Number(additive['add-price']);
      }
    });

    modalPrice.textContent = `$${total.toFixed(2)}`;
  }
}
