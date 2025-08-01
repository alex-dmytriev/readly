import { refs } from './refs';
import { getTopBooks, getCategoryList, getBooksByCategory } from './api';
import {
  createGallery,
  createCategory,
  createCategoryDropdown,
  renderCounter,
  clearGallery,
  clearCategory,
  clearCategoryDropdown,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  filterUniqueBooksByTitle,
} from './books-render-functions';
import iziToast from 'izitoast';

const firstPerPage = 24;
const firstPerPageMobile = 10;
const itemsPerPage = 4;
let allData = [];
let currentPage = 1;

const getTotalNow = () => {
  const offset = innerWidth < 768 ? firstPerPageMobile : firstPerPage;
  const totalNow =
    currentPage === 1 ? offset : offset + (currentPage - 1) * itemsPerPage;

  return Math.min(totalNow, allData.length);
};

const onRenderCategories = async () => {
  try {
    const categories = await getCategoryList();
    clearCategoryDropdown();
    clearCategory();
    createCategoryDropdown(categories.slice(0, 50));
    createCategory(categories.slice(0, 50));
  } catch (error) {
    iziToast.error({
      message: `Error: ${error}`,
      position: 'topRight',
    });
  }
};

const renderTopBooks = async () => {
  try {
    clearGallery();
    currentPage = 1;
    showLoader();
    const categories = await getTopBooks();
    const allBooks = categories.flatMap(category => category.books);
    allData = filterUniqueBooksByTitle(allBooks);
    createGallery(getPageData(currentPage));
    renderCounter(getTotalNow(), allData.length);
    if (getTotalNow() < allData.length) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: `Error: ${error}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
};

const onCategoryClick = async e => {
  try {
    if (e.target.textContent === 'All categories') {
      renderTopBooks();
    } else {
      showLoader();
      e.preventDefault();
      clearGallery();
      currentPage = 1;
      const searchValue = e.target.textContent.trim();
      const searchQuery = await getBooksByCategory(searchValue);
      allData = filterUniqueBooksByTitle(searchQuery);
      createGallery(getPageData(currentPage));
      renderCounter(getTotalNow(), allData.length);
    }
    if (getTotalNow() < allData.length) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: `Error: ${error}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
};

const onShowMoreClick = async e => {
  try {
    showLoader();
    currentPage++;
    e.target.blur();
    createGallery(getPageData(currentPage));
    renderCounter(getTotalNow(), allData.length);
    showLoadMoreButton();
    if (getTotalNow() >= allData.length) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
    const heightCard =
      refs.galleryList.lastElementChild.getBoundingClientRect().height;

    scrollBy({
      top: heightCard * 1.2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      message: `Error: ${error}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
};

const getPageData = page => {
  if (page === 1) {
    if (innerWidth < 768) {
      return allData.slice(0, firstPerPageMobile);
    } else {
      return allData.slice(0, firstPerPage);
    }
  }

  const offset = innerWidth < 768 ? firstPerPageMobile : firstPerPage;
  const startIndex = offset + (page - 2) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return allData.slice(startIndex, endIndex);
};

const onOpenDropdownClick = e => {
  refs.dropdownMenu.classList.toggle('is-hidden');
};

const onCategoryDropdownClick = async e => {
  try {
    refs.dropdownMenu.classList.add('is-hidden');
    if (e.target.textContent === 'All categories') {
      refs.dropdownToggleText.textContent = 'All categories';
      renderTopBooks();
    } else {
      showLoader();
      e.preventDefault();
      clearGallery();
      currentPage = 1;
      const searchValue = e.target.textContent.trim();
      const searchValueSlice = searchValue;
      refs.dropdownToggleText.textContent = searchValueSlice;
      const searchQuery = await getBooksByCategory(searchValue);
      allData = filterUniqueBooksByTitle(searchQuery);
      createGallery(getPageData(currentPage));
      renderCounter(getTotalNow(), allData.length);
    }

    if (currentPage * firstPerPage < allData.length) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: `Error: ${error}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
};

const onHideDropdownClick = e => {
  const isMenu = refs.dropdownMenu.contains(e.target);
  const isToggle = refs.dropdownToggle.contains(e.target);

  if (!isMenu && !isToggle) {
    refs.dropdownMenu.classList.add('is-hidden');
  }
};

renderTopBooks();
onRenderCategories();

document.addEventListener('click', onHideDropdownClick);
refs.categoryList.addEventListener('click', onCategoryClick);
refs.showMoreBtn.addEventListener('click', onShowMoreClick);
refs.dropdownToggle.addEventListener('click', onOpenDropdownClick);
refs.dropdownMenu.addEventListener('click', onCategoryDropdownClick);
