'use strict';

const POSITION = ['0%', '100%', '200%'];

const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelector('.slider-slides');
const prevBtn = document.querySelector('.slider-btn_prev');
const nextBtn = document.querySelector('.slider-btn_next');
const pagesArray = document.querySelectorAll('.slider-page')

let currentPos = 0

let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

slides.style.right = POSITION[currentPos];
pagesArray[currentPos].classList.add('slider-page_active')

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

function nextSlide() {
  currentPos += 1;
  if (currentPos >= POSITION.length) currentPos = 0;

  slides.style.right = POSITION[currentPos];

  pagesArray.forEach(el => el.classList.remove('slider-page_active'))
  pagesArray[currentPos].classList.add('slider-page_active')
}

function prevSlide() {
  currentPos -= 1;
  if (currentPos < 0) currentPos = POSITION.length - 1;

  slides.style.right = POSITION[currentPos];

  pagesArray.forEach(el => el.classList.remove('slider-page_active'))
  pagesArray[currentPos].classList.add('slider-page_active')
}
