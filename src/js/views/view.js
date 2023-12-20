export default class View {
  _data;
  _discountOptions = ["all", "with discount", "without discount"];
  _countryOptions = ["all"];
  _maxCapacityOptions = ["any"];
  _priceRange = { min: 0, max: 0 };

  update(data) {
    this._data = data;
    this._resetOptions();
    const filtersCountMarkup = this._generateFiltersCountMarkup();
    const discountOptionsMarkup = this._genrateDiscountOptionsMarkup();
    const countryOptionsMarkup = this._generateCountryOptionsMarkup();
    const capacityOptionsMarkup = this._generateCapacityOptionsMarkup();
    const priceRangeOptionsMarkup = this._generatePriceRangeOptionsMarkup();

    const newDOM = document
      .createRange()
      .createContextualFragment(
        `${filtersCountMarkup}${discountOptionsMarkup}${countryOptionsMarkup}${capacityOptionsMarkup}${priceRangeOptionsMarkup}`
      );

    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      console.log(curEl, newEl, newEl.isEqualNode(curEl));
      //   console.log(curEl.isEqualNode(newEl));

      if (
        !newEl.isEqualNode(curEl) &&
        newEl?.firstChild?.nodeValue?.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
          if (attr.name === "value") {
            console.log(curEl);
            curEl.innerHTML = "";
            curEl.innerHTML = newEl;
          }
        });
      }
    });

    console.log(newElements);
    console.log(curElements);
  }

  _resetOptions() {
    this._discountOptions = ["all", "with discount", "without discount"];
    this._countryOptions = ["all"];
    this._maxCapacityOptions = ["any"];
    this._priceRange = { min: 0, max: 0 };
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}

// React is a library to manage and build complex UI.
// React is a simple way to manage application state, render UI and conduct side-effects.
// SEO, browser render issue, No Route.
