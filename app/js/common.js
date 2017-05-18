var toggle = document.querySelector('.toggle--closed');
var navToggle = document.querySelector('.main-nav__toggle');
var navMain = document.querySelector('.main-nav');
var promo = document.querySelector('.page-header__promo');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (toggle.classList.contains('toggle--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    promo.classList.add('animation__smooth-menu');
    toggle.setAttribute('xlink:href', '#icon-menu-cross');
    toggle.classList.remove('toggle--closed');
    toggle.classList.add('toggle--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    toggle.setAttribute('xlink:href', '#icon-menu-burger');
    toggle.classList.add('toggle--closed');
    toggle.classList.remove('toggle--opened');
    promo.classList.remove('animation__smooth-menu');
  }
});

// document.getElementById('aaa').xlink:href = 'http://google.com/'
// var navMain = document.querySelector('.main-nav');
// var navMenu = document.querySelector('.main-nav__menu');
// var navItems = document.querySelector('.main-nav__items');
// var toggleCross = document.querySelector('.toggle--burger');
// var toggleBurger = document.querySelector('.toggle--cross');
// var navToggle = document.querySelector('.main-nav__toggle');


// document.getElementById('aaa').href = 'http://google.com/'

// navToggle.addEventListener('click', function() {
// 	if (navMain.classList.contains('main-nav--closed')) {
// 		navMain.classList.remove('main-nav--closed');
// 		navMain.classList.add('main-nav--opened');
// 	} else {
// 		navMain.classList.add('main-nav--closed');
// 		navMain.classList.remove('main-nav--opened');
// 	}
// });
