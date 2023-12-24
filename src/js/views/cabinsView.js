import View from "./view";

class CabinsView extends View {
  _parentElement = document.querySelector(".cabins");

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="img/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerBookCabin(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.closest(".cabin__btn--book")) {
        const cabinId = Number(e.target.closest(".cabin").dataset.cabin);
        console.log(cabinId);
        handler(cabinId);
      }
    });
  }

  addHandlerUpdateGuests(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.closest(".btn--update")) {
        // In dataset object camelCase notation doesnot work, I.E. 'maxGuests' is written in camelCase but if you inspect html then you see it's actually written 'maxguests'
        const maxGuests = Number(
          e.target.closest(".btn--update").dataset.maxguests
        );
        const updateTo = Number(
          e.target.closest(".btn--update").dataset.update
        );
        const cabinId = Number(e.target.closest(".cabin").dataset.cabin);
        console.log(updateTo, maxGuests);

        if (updateTo > maxGuests) return;
        if (updateTo === 0) return;

        handler(updateTo, cabinId);
      }
    });
  }

  addHandlerDeleteCabin(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.closest(".cabin__btn--delete")) {
        const cabinId = Number(e.target.closest(".cabin").dataset.cabin);
        handler(cabinId);
      }
    });
  }

  addHandlerShowDetails(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _generateMarkup() {
    console.log(this._data.filters);
    return `${this._data.filters.filteredCabins
      .map(this._generateMarkupCabin.bind(this))
      .join("")}`;
  }

  _generateMarkupCabin(cabin) {
    const { id, image, name, maxCapacity, address, regularPrice, discount } =
      cabin;
    const isInCart = this._data.cart.results.find((el) => el.id === id);
    console.log(isInCart);

    return `
      <li class="cabin" data-cabin=${id}>
        <img class="cabin__img" src=${image} alt=${name}>
        <div class="cabin__overview">
          <h3 class="cabin__name">${name}</h3>
          <p class="cabin__address">${address}</p>
        </div>
        <p class="cabin__capacity">Capacity: ${maxCapacity}</p>
        <p class="cabin__price">Price: ${regularPrice}</p>
        <p class="cabin__discount">Discount: ${discount}</p>
        <div class="cabin__actions">
            <button class="cabin__btn cabin__btn--${
              isInCart ? "delete" : "book"
            }">${isInCart ? "Delete Cabin" : "Book Cabin"}</button>
            <a href="#${id}" class="cabin__btn cabin__btn--details">details</a>
        </div>

        ${
          isInCart
            ? `<div class="cabin__guests">
                 
                  <div class="guests__control">
                    <button class="btn-round btn--update" data-update="${
                      isInCart.guests + 1
                    }" data-maxGuests="${maxCapacity}">+</button>
                    <p class="cabin__guests--count">Guests ${
                      isInCart.guests
                    }</p>
                    <button class="btn-round btn--update" data-update=${
                      isInCart.guests - 1
                    }>-</button>
                  </div>
                </div>`
            : ""
        }
      </li>
    `;
  }
}

export default new CabinsView();
