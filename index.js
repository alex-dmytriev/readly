import{a as l}from"./assets/vendor-CS6TiLPF.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const n={headerContainerEl:document.querySelector(".header-container"),heroContainerEl:document.querySelector(".hero-container"),booksContainerEl:document.querySelector(".books-container"),feedbacksContainerEl:document.querySelector(".feedbacks-container"),eventsContainerEl:document.querySelector(".events-container"),contactModalContainerEl:document.querySelector(".contact-modal-container"),bookModalContainerEl:document.querySelector(".book-modal-container"),footerContainerEl:document.querySelector(".footer-container"),galleryList:document.querySelector(".books-gallery-list"),categoryList:document.querySelector(".books-nav-category")};n.heroContainerEl.insertAdjacentHTML("beforeend");const i=async()=>(await l.get("https://books-backend.p.goit.global/books/top-books")).data,d=c=>{const r=c.map(t=>`<li class="books-gallery-card">
          <img
            class="books-gallery-img"
            src="${t.book_image}"
            alt="${t.description}"
            width="227"
            height="323"
          />
          <div class="books-gallery-card-info">
            <h3 class="books-gallery-card-title">${t.title}</h3>
            <p class="books-gallery-card-author">${t.author}</p>
            <p class="books-gallery-card-price">$${t.price}</p>
          </div>
          <button class="books-gallery-card-btn" type="button">
            Learn More
          </button>
        </li>`).join("");n.galleryList.innerHTML=r},u=async()=>{try{const r=(await i()).flatMap(t=>t.books);d(r)}catch(c){console.log(c)}};u();n.bookModalContainerEl.insertAdjacentHTML("beforeend","<h2>book-modal.js is connected successfully!</h2>");n.feedbacksContainerEl.insertAdjacentHTML("beforeend","<h2>feedbacks.js is connected successfully!</h2>");n.eventsContainerEl.insertAdjacentHTML("beforeend","<h2>events.js is connected successfully!</h2>");n.contactModalContainerEl.insertAdjacentHTML("beforeend","<h2>contact-modal.js is connected successfully!</h2>");n.footerContainerEl.insertAdjacentHTML("beforeend","");
//# sourceMappingURL=index.js.map
