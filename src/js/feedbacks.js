//import { refs } from './refs';

//refs.feedbacksContainerEl.insertAdjacentHTML(
//  'beforeend','<p>feedbacks.js section</p>');

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const customAvatars = [
  '/img/feedbacks/avatar-jane.jpg',
  '/img/feedbacks/avatar-john.jpg',
];

const feedbackData = [
  {
    text: 'Great selection, fast delivery, and beautifully packaged books. My go-to store for weekend reads!',
    name: 'Jane Doe',
    role: 'Book Lover, Reader',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=random',
  },
  {
    text: 'Customer service was super helpful, and my order arrived earlier than expected. Highly recommend!',
    name: 'John Smith',
    role: 'Editor, BookMag',
    avatar: ' https://ui-avatars.com/api/?name=John+Smith&background=random',
  },
  {
    text: 'Love the curated picks and clear descriptions. Makes it easy to find my next favorite book.',
    name: 'Emily Johnson',
    role: 'Author, Novelist',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Johnson&background=random',
  },
  {
    text: 'Amazing experience! I’ll definitely come back.',
    name: 'Liam Green',
    role: 'Book Collector',
    avatar: 'https://ui-avatars.com/api/?name=Liam+Green&background=random',
  },
  {
    text: 'Books came in perfect condition. Thank you!',
    name: 'Olivia Brown',
    role: 'Student',
    avatar: 'https://ui-avatars.com/api/?name=Olivia+Brown&background=random',
  },
  {
    text: 'Fast service and high-quality packaging.',
    name: 'Ethan Wilson',
    role: 'Library Assistant',
    avatar: 'https://ui-avatars.com/api/?name=Ethan+Wilson&background=random',
  },
  {
    text: 'Nice recommendations and filters. Easy to use!',
    name: 'Ava Davis',
    role: 'Book Blogger',
    avatar: 'https://ui-avatars.com/api/?name=Ava+Davis&background=random',
  },
  {
    text: 'Loved the gift wrap option! Perfect for birthdays.',
    name: 'Noah Taylor',
    role: 'Dad, Reader',
    avatar: 'https://ui-avatars.com/api/?name=Noah+Taylor&background=random',
  },
  {
    text: 'User-friendly site and quick checkout.',
    name: 'Isabella Moore',
    role: 'Journalist',
    avatar: 'https://ui-avatars.com/api/?name=Isabella+Moore&background=random',
  },
  {
    text: 'Always on time and reliable.',
    name: 'Mason Thomas',
    role: 'Book Reviewer',
    avatar: 'https://ui-avatars.com/api/?name=Mason+Thomas&background=random',
  },
  {
    text: "One of the best book platforms I've used!",
    name: 'Sophia White',
    role: 'Writer',
    avatar: 'https://ui-avatars.com/api/?name=Sophia+White&background=random',
  },
  {
    text: 'Responsive support and great selection!',
    name: 'Lucas Hall',
    role: 'Reader',
    avatar: 'https://ui-avatars.com/api/?name=Lucas+Hall&background=random',
  },
];
const feedbackList = document.querySelector('.feedback-list');

feedbackData.forEach((feedback, index) => {
  const li = document.createElement('li');
  li.classList.add('swiper-slide', 'feedback-item');

  // Вибираємо аватар: перші два — зі свого масиву, інші — з feedbackData
  const avatarSrc = index < 2 ? customAvatars[index] : feedback.avatar;

  li.innerHTML = `
    <div class="feedback-card">
      <p class="quote">"${feedback.text}"</p>
      <div class="author">
        <img src="${avatarSrc}" alt="${feedback.name}" class="avatar" loading="lazy" />
        <div>
          <p class="name">${feedback.name}</p>
          <p class="role">${feedback.role}</p>
        </div>
      </div>
    </div>
  `;
  feedbackList.appendChild(li);
});

const swiper = new Swiper('.feedback-swiper', {
  modules: [Navigation, Pagination],

  spaceBetween: 24,
  slidesPerView: 1,
  slidesPerGroup: 1,
  allowTouchMove: true,
  navigation: {
    nextEl: '.next-btn',
    prevEl: '.prev-btn',
  },
  keyboard: { enabled: true },
  a11y: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0, // або 16 для легкого відступу
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 1,
      spaceBetween: 24,
    },
    1440: {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 24,
    },
  },
  on: {
    init: () => updateActiveDot(0),
    slideChange: () => {
      const groupIndex = Math.floor(
        swiper.activeIndex / swiper.params.slidesPerGroup
      );
      updateActiveDot(groupIndex);
    },
  },
});

document.querySelectorAll('.dot').forEach((dot, i) => {
  dot.addEventListener('click', () => {
    swiper.slideTo(i * swiper.params.slidesPerGroup);
  });
});

function updateActiveDot(activeIndex) {
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === activeIndex);
  });
}
