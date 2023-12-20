import {
  getMaxValue,
  getMinValue,
  getUniqueCountries,
  getUniqueNumbers,
  sortByNumber,
} from "../utils/helpers";
import View from "./view";
import icons from "../../img/icons.svg";

class FiltersView extends View {
  _parentElement = document.querySelector(".filters");

  // _discountOptions = ["all", "with discount", "without discount"];
  // _countryOptions = ["all"];
  // _maxCapacityOptions = ["any"];
  // _priceRange = { min: 0, max: 0 };

  render(data) {
    this._data = data;

    const filtersCountMarkup = this._generateFiltersCountMarkup();
    const discountOptionsMarkup = this._genrateDiscountOptionsMarkup();
    const countryOptionsMarkup = this._generateCountryOptionsMarkup();
    const capacityOptionsMarkup = this._generateCapacityOptionsMarkup();
    const priceRangeOptionsMarkup = this._generatePriceRangeOptionsMarkup();
    this._resetOptions();
    this._clear();

    this._parentElement.insertAdjacentHTML("beforeend", filtersCountMarkup);
    this._parentElement.insertAdjacentHTML("beforeend", discountOptionsMarkup);
    this._parentElement.insertAdjacentHTML("beforeend", countryOptionsMarkup);
    this._parentElement.insertAdjacentHTML("beforeend", capacityOptionsMarkup);
    this._parentElement.insertAdjacentHTML(
      "beforeend",
      priceRangeOptionsMarkup
    );
  }

  // _resetOptions() {
  //   this._discountOptions = ["all", "with discount", "without discount"];
  //   this._countryOptions = ["all"];
  //   this._maxCapacityOptions = ["any"];
  //   this._priceRange = { min: 0, max: 0 };
  // }

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

  addHandlerFilter(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const targetElement = e.target;
      const filterDiscountEl = targetElement.closest(
        ".filters__discount--btns"
      );

      const filterCountryEl = targetElement.closest(".filters__country--btns");

      const filterCapacityEl = targetElement.closest(
        ".filters__capacity--btns"
      );

      console.log(filterCapacityEl);

      if (filterDiscountEl) {
        const filterValue = targetElement.dataset.discount.split(" ").join("-");
        handler({ discount: filterValue });
      }

      if (filterCountryEl) {
        const filterValue = targetElement.dataset.country.trim().toLowerCase();
        handler({ country: filterValue });
      }

      if (filterCapacityEl) {
        const filterValue = Number(targetElement.dataset.capacity)
          ? Number(targetElement.dataset.capacity)
          : targetElement.dataset.capacity;
        console.log(filterValue);
        handler({ capacity: filterValue });
      }
    });
  }

  addHandlerPriceRange(handler) {
    document.querySelector("#range").addEventListener(
      "input",
      function () {
        // console.dir(e.target.value);
        console.log(document.querySelector("#range").value);
        // const value = Number(e.target.value);
        const value = Number(document.querySelector("#range").value);
        handler({ priceRange: value });
      },
      false
    );
  }

  addHandlerFilterClear(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.closest(".filters__clear--btn")) {
        console.log(e.target);
        handler();
      }
    });
  }

  _generateFiltersCountMarkup() {
    const { discount, capacities, countries, priceRange } =
      this._data.filters.value;
    let totalCount = 0;

    if (capacities[0] !== "any") {
      totalCount += capacities.length;
    }

    if (countries[0] !== "all") {
      totalCount += countries.length;
    }

    if (discount !== "all") {
      totalCount += 1;
    }

    // if (priceRange) {
    //   totalCount += 1;
    // }

    return `
    <div class="filters__actions">
      <div class="filters__count">
        <button class="filters__count--btn">Filters ${totalCount}</button>
      </div>
      <div class="filters__result">Results &mdash; ${this._data.filters.filteredCabins.length}</div>
      <div class="filters__clear">
        <button class="filters__clear--btn">Clear</button>
      </div>
    </div>
    `;
  }

  _genrateDiscountOptionsMarkup() {
    const currentFilter = this._data.filters.value.discount;

    return `
			<div class="filters__container filters__discount">
				<div class="filters__discount--btns">
				 	${this._discountOptions
            .map(
              (discount) => `
					 	<button class="filters__discount--btn ${
              currentFilter === discount.split(" ").join("-") ? "active" : ""
            }" data-discount="${discount}">${discount}</button>
					`
            )
            .join("")}
				</div>
			</div>
		`;
  }

  _generateCountryOptionsMarkup() {
    this._countryOptions = [
      ...this._countryOptions,
      ...getUniqueCountries(this._data.cabins),
    ];

    console.log(this._countryOptions);

    const currentFilter = function (value) {
      // console.log(this._data?.filters.value.countries, value);
      return this._data?.filters.value.countries.includes(value);
    };

    return `
			<div class="filters__container filters__country">
				<div class="filters__label">
					<h3 class="heading--3">Country</h3>
				</div>
				<div class="filters__country--btns">
				 ${this._countryOptions
           .map(
             (country) =>
               `<button class="filters__country--btn ${
                 currentFilter.call(this, country.trim().toLowerCase())
                   ? "active"
                   : ""
               }" data-country=${country}>${country}</button>`
           )
           .join("")}
				</div>
			</div>
		`;
  }

  _generateCapacityOptionsMarkup() {
    const uniqueCapacityNumbers = getUniqueNumbers(
      this._data.cabins,
      "maxCapacity"
    );

    const sortedCapacity = sortByNumber(uniqueCapacityNumbers);

    this._maxCapacityOptions = [...this._maxCapacityOptions, ...sortedCapacity];

    const activeBtn = function (value) {
      return this._data.filters.value.capacities.includes(value);
    };

    return `
			<div class="filters__container filters__capacity">
				<div class="filters__label">
					<h3 class="heading--3">Max Capacity</h3>
				</div>
				<div class="filters__capacity--btns">
				${this._maxCapacityOptions
          .map(
            (capacity) =>
              `<button class="filters__capacity--btn ${
                activeBtn.call(this, capacity) ? "active" : ""
              }" data-capacity=${capacity}>${capacity}</button>`
          )
          .join("")}
				
				</div>
			</div>
		`;
  }

  _generatePriceRangeOptionsMarkup() {
    this._priceRange.min = getMinValue(this._data.cabins, "regularPrice");
    this._priceRange.max = getMaxValue(this._data.cabins, "regularPrice");
    // console.log(this._priceRange);
    const { min, max } = this._priceRange;
    const selectedRange = this._data.filters.value.priceRange || min;

    return `
			<div class="filters__container filters__price-range">
				<div class="filters__label">
					<h3 class="heading--3">Price Range</h3>
				</div>

				<div class="filters__price-range--container">
					<div class="filters__price-range--text">Range: $(${min} &mdash; ${max}) <P>Current: $${selectedRange}</p></div>
					<form class="filters__price-range--input">
						<input
              type="range"
              name="price"
              min=${min}
              max=${max}
              value=${selectedRange}
              id="range"
						/>
					</form>
				</div>
			</div>
		`;
  }
}

export default new FiltersView();
