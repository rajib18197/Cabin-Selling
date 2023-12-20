import icons from "../../img/icons.svg";

class CabinDetails {
  _parentElement = document.querySelector(".cabins");
  _data;

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

  generateMarkup() {
    const { id, image, name, facilities, maxCapacity, guests, bookmarked } =
      this._data;
    console.log(id);

    return `
      <figure class="recipe__fig">
        <button class="btn--back btn--back-modifier">Back To Home</button>
        <img src="${image}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${name}</span>
        </h1>
      </figure>
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${maxCapacity}</span>
          <span class="recipe__info-text">Capacity</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${guests}</span>
          <span class="recipe__info-text">Guest</span>
          <div class="recipe__info-buttons">
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
        <div class="recipe__user-generated">
          <svg>
            <use href="src/img/icons.svg#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="src/img/icons.svg#icon-bookmark${
              bookmarked ? "-fill" : ""
            }"></use>
          </svg>
        </button>
      </div>
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${facilities.map(this._generateMarkupFacilities).join("")}
        </ul>
      </div>
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
          directions at their website.
        </p>
        <button
          class="btn--small recipe__btn cabin--book" data-cabin=${id}
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
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="src/img/icons.svg#icon-check"></use>
        </svg>
       ${
         benefit.quantity
           ? `<span class="quantity">${benefit.quantity}</span>`
           : ""
       }
        <div class="recipe__description">
          ${" "}${benefit.description}
        </div>
      </li>
    `;
  }
}

export default new CabinDetails();
