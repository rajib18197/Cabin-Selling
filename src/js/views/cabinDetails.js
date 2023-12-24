import icons from "../../img/icons.svg";

class CabinDetails {
  _parentElement = document.querySelector(".cabins");
  _data;
  _starLength = 5;
  _curRating = 0;

  render(data) {
    this._data = data;
    const markup = this.generateMarkup();
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  update(data) {
    this._data = data;

    const markup = this.generateMarkup();

    const newDOM = document.createRange().createContextualFragment(markup);

    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      console.log(curEl, newEl, newEl.isEqualNode(curEl));
      if (
        !newEl.isEqualNode(curEl) &&
        newEl?.firstChild?.nodeValue?.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  addHandlerUpdateGuests(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.closest(".btn--update-guests")) {
        const updateTo = Number(
          e.target.closest(".btn--update-guests").dataset.updateTo
        );

        const capacity = Number(
          e.target.closest(".btn--update-guests").dataset.maxCapacity
        );

        console.log(updateTo);
        if (updateTo > capacity) return;
        if (updateTo === 0) return;

        handler(updateTo);
      }
    });
  }

  addHandeleBookMark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.closest(".btn--bookmark")) {
        handler();
      }
    });
  }

  addHandlerBookCabin(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.closest(".cabin--book")) {
        const cabinId = Number(e.target.closest(".cabin--book").dataset.cabin);
        console.log(cabinId);
        handler(cabinId);
      }
    });
  }

  addHandlerBackToHome(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.closest(".btn--back")) {
        handler();
      }
    });
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRating(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (!e.target.closest(".btn--star")) return;
      const target = Number(e.target.closest(".btn--star").dataset.star);
      console.log(target);
      handler(target);
    });
  }

  generateMarkup() {
    const {
      id,
      image,
      name,
      facilities,
      maxCapacity,
      guests,
      bookmarked,
      rating,
    } = this._data;
    console.log(id, rating);

    return `
      <figure class="cabin__fig">
        <button class="btn--back btn--back-modifier">Back To Home</button>
        <img src="${image}" alt="Tomato" class="cabin__img" />
        <h1 class="cabin__title">
          <span>${name}</span>
        </h1>
      </figure>
      <div class="cabin__details">
        <div class="cabin__info">
          <svg class="cabin__info-icon">
            <use href="src/img/icons.svg#icon-clock"></use>
          </svg>
          <span class="cabin__info-data cabin__info-data--minutes">${maxCapacity}</span>
          <span class="cabin__info-text">Capacity</span>
        </div>
        <div class="cabin__info">
          <svg class="cabin__info-icon">
            <use href="src/img/icons.svg#icon-users"></use>
          </svg>
          <span class="cabin__info-data cabin__info-data--people">${guests}</span>
          <span class="cabin__info-text">Guest</span>
          <div class="cabin__info-buttons">
            <button class="btn--tiny btn--update-guests" data-update-to=${
              guests - 1
            } data-max-capacity=${maxCapacity}>
              <svg>
                <use href="src/img/icons.svg#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-guests" data-update-to=${
              guests + 1
            } data-max-capacity=${maxCapacity}>
              <svg>
                <use href="src/img/icons.svg#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
        <div class="cabin__user-generated">
           ${Array.from(
             { length: this._starLength },
             (_, i) => `
           <button class="btn--star" data-star=${i + 1}>
             <svg>
               <use href="src/img/icons.svg#icon-star${
                 rating !== 0 && rating >= i + 1 ? "_rate" : "_outline"
               }"></use>
             </svg>
           </button>
          `
           ).join("")}
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="src/img/icons.svg#icon-bookmark${
              bookmarked ? "-fill" : ""
            }"></use>
          </svg>
        </button>
      </div>
      <div class="cabin__ingredients">
        <h2 class="heading--2">Cabin facilities</h2>
        <ul class="cabin__ingredient-list">
          ${facilities.map(this._generateMarkupFacilities).join("")}
        </ul>
      </div>
      <div class="cabin__directions">
        <button
          class="btn--small cabin__btn cabin--book" data-cabin=${id}
        >
          <span>Book Now</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
        </button>
      </div>
        `;
  }

  _generateMarkupFacilities(benefit) {
    return `
      <li class="cabin__ingredient">
        <svg class="cabin__icon">
          <use href="src/img/icons.svg#icon-check"></use>
        </svg>
       ${
         benefit.quantity
           ? `<span class="quantity">${benefit.quantity}</span>`
           : ""
       }
        <div class="cabin__description">
          ${" "}${benefit.description}
        </div>
      </li>
    `;
  }
}

export default new CabinDetails();
