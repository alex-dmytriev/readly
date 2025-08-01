import { refs } from './refs';

export const createGallery = books => {
  const galleryCardTemplate = books
    .map(book => {
      const lowTitle = book.title.toLowerCase();
      const roundPrice = Math.round(Number(book.price));

      return `<li class="books-gallery-card" data-id="${book._id}" >
          <div class="books-gallery-img-wrapper">
            <img
              class="books-gallery-img"
              src="${book.book_image}"
              alt="${book.description}"
              width="227"
            />
          </div>
          <div class="books-gallery-card-info">
            <div class="books-gallery-card-text">
              <h3 class="books-gallery-card-title">${lowTitle}</h3>
              <p class="books-gallery-card-author">${book.author}</p>
            </div>
            <p class="books-gallery-card-price">$${roundPrice}</p>
          </div>
          <button class="books-gallery-card-btn" type="button">
            Learn More
          </button>
        </li>`;
    })
    .join('');
  refs.galleryList.insertAdjacentHTML('beforeend', galleryCardTemplate);
};

export const createCategory = list => {
  const categoryItemTemplate = list
    .map(item => {
      if (item.list_name === '') {
        return;
      }
      return `<li class="books-nav-category-item">
          <a href="#">${item.list_name}</a>
        </li>`;
    })
    .join('');
  refs.categoryList.insertAdjacentHTML('beforeend', categoryItemTemplate);
};

export const createCategoryDropdown = list => {
  const categoryItemTemplateDropdown = list
    .map(item => {
      if (item.list_name === '') {
        return;
      }
      return `<li class="books-dropdown-menu-item"><a href="#">${item.list_name}</a></li>`;
    })
    .join('');
  refs.dropdownMenu.insertAdjacentHTML(
    'beforeend',
    categoryItemTemplateDropdown
  );
};

export const renderCounter = (itemsNow, itemsAll) => {
  const counterTemplate = `Showing ${itemsNow} of ${itemsAll}`;
  refs.counter.textContent = counterTemplate;
};

export const clearGallery = () => {
  refs.galleryList.innerHTML = '';
};

export const clearCategory = () => {
  refs.categoryList.innerHTML = `<li class="books-nav-category-item">
          <a href="#">All categories</a>
        </li>`;
};
export const clearCategoryDropdown = () => {
  refs.dropdownMenu.innerHTML = `<li class="books-dropdown-menu-item"><a href="#">All categories</a></li>`;
};

export const showLoader = () => {
  refs.loader.classList.remove('is-hidden');
};

export const hideLoader = () => {
  refs.loader.classList.add('is-hidden');
};

export const showLoadMoreButton = () => {
  refs.showMoreBtn.classList.remove('is-hidden');
};

export const hideLoadMoreButton = () => {
  refs.showMoreBtn.classList.add('is-hidden');
};

export const filterUniqueBooksByTitle = books => {
  const seen = new Set();
  return books.filter(book => {
    const normalizedTitle = book.title.trim().toLowerCase();
    if (seen.has(normalizedTitle)) {
      return false;
    } else {
      seen.add(normalizedTitle);
      return true;
    }
  });
};
