import { refs } from './refs';
// 111
export const createGallery = books => {
  const galleryCardTemplate = books
    .map(
      book =>
        `<li class="books-gallery-card">
          <img
            class="books-gallery-img"
            src="${book.previewImg}"
            alt="{book.alt}"
            width="227"
            height="323"
          />
          <div class="books-gallery-card-info">
            <h3 class="books-gallery-card-title">Daisy Jones & The Six</h3>
            <p class="books-gallery-card-author">Taylor Jenkins Reid</p>
            <p class="books-gallery-card-price">$14</p>
          </div>
          <button class="books-gallery-card-btn" type="button">
            Learn More
          </button>
        </li>`
    )
    .join('');
  refs.galleryList.innerHTML = galleryCardTemplate;
};

export const createCategory = list => {
  const categoryItemTemplate = list
    .map(
      item =>
        `<li class="books-nav-category-item">
          <a href="#">${item.category}</a>
        </li>`
    )
    .join('');
  refs.categoryList.innerHTML = categoryItemTemplate;
};
