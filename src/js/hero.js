import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const heroSwiper = new Swiper('.hero-swiper', {
  modules: [Navigation, Pagination, Autoplay],
  loop: false,
  grabCursor: true,
  preloadImages: false,

  navigation: {
    nextEl: '.hero-swiper-btn-next',
    prevEl: '.hero-swiper-btn-prev',
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  // pagination: {
  //   el: '.hero-swiper-pagination',
  //   clickable: true,
  // },

  speed: 500,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});


document
  .querySelectorAll('.hero-swiper-btn-prev, .hero-swiper-btn-next, .banner-btn')
  .forEach(button => {
    button.addEventListener('mouseup', () => button.blur());
  });
