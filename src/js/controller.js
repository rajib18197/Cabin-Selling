import * as model from "./model.js";
import { getMaxValue } from "./utils/helpers.js";
import cabinDetails from "./views/cabinDetails.js";
import cabinsView from "./views/cabinsView.js";
import cartView from "./views/cartView.js";
import filtersView from "./views/filtersView.js";
import bookmarkView from "./views/bookMarkView.js";
import searchView from "./views/searchView.js";
import bookedCabinView from "./views/bookedCabinView.js";

const controlCabins = async function () {
  try {
    cabinsView.renderSpinner();
    filtersView.renderSpinner();

    await model.loadCabins();
    const maxCabinPrice = getMaxValue(model.state.cabins, "regularPrice");
    model.cabinsOperations({ priceRange: maxCabinPrice });

    cabinsView.render(model.state);
    filtersView.render(model.state);

    filtersView.addHandlerPriceRange(controlFilters);
  } catch (err) {
    console.log(err);
  }
};

const controlFilters = function ({ discount, country, capacity, priceRange }) {
  const filters = model.state.filters.value;
  const isInFilterCountries = filters.countries.includes(country);
  const isInFilterCapacities = filters.capacities.includes(capacity);

  if (isInFilterCountries || isInFilterCapacities) {
    if (isInFilterCapacities) {
      model.removeFilterValue(capacity, "capacities");
    }

    if (isInFilterCountries) {
      model.removeFilterValue(country, "countries");
    }

    console.log(model.state.filters.value.countries);
    model.cabinsOperations();
  } else {
    if (priceRange) {
      model.cabinsOperations({ priceRange });
    }

    if (discount) {
      model.cabinsOperations({ discount });
    }

    if (country) {
      model.cabinsOperations({ country });
    }

    if (capacity) {
      model.cabinsOperations({ capacity });
    }
  }

  cabinsView.render(model.state);
  filtersView.render(model.state);
  // filtersView.update(model.state);
  filtersView.addHandlerPriceRange(controlFilters);
};

const controlClearFilters = function () {
  model.clearFilters();
  cabinsView.render(model.state);
  filtersView.render(model.state);
};

const controlBookCabin = function (id) {
  model.addToCart(id);
  cabinsView.render(model.state);
  cartView.render(model.state.cart);
};

const controlUpdateGuests = function (value, id) {
  model.updateCartGuests(value, id);
  cabinsView.render(model.state);
  cartView.render(model.state.cart);
};

const controlDeleteCabinFromCart = function (id) {
  model.deleteFromCart(id);
  cabinsView.render(model.state);
  cartView.render(model.state.cart);
};

const controlOrder = async function ({ fullName, email, address }) {
  cartView.renderSpinner();

  await model.bookCabin({ fullName, email, address });
  cartView.closeModal();
  cartView.render(model.state.cart);
  cabinsView.render(model.state);
};

const controlCabinDetails = async function () {
  const id = window.location.hash.slice(1);
  console.log(id);

  if (!id) return;

  cabinDetails.renderSpinner();

  await model.loadCabinDetails(id);
  cabinDetails.render(model.state.cabinDetails);
};

const controlGuests = function (guest) {
  model.updateGuests(guest);
  cabinDetails.update(model.state.cabinDetails);
};

const controlBookMark = function () {
  if (model.state.cabinDetails.bookmarked) {
    model.deleteBookMark(model.state.cabinDetails.id);
  } else {
    model.addBookMark(model.state.cabinDetails);
  }

  cabinDetails.update(model.state.cabinDetails);
  bookmarkView.render(model.state.bookmarks);
};

const bookmarkedCabins = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlSearch = async function () {
  const searchTerm = searchView.getSearchTerm();
  bookedCabinView.renderSpinner();

  await model.loadOrderedCabin(searchTerm);
  bookedCabinView.render(model.state.orderedCabin);
};

const controlBackToHome = function () {
  window.location.hash = "";
  cabinsView.render(model.state);
};

const init = function () {
  controlCabins();
  bookmarkedCabins();
  bookedCabinView.addHandlerBackToHome(controlBackToHome);
  cabinDetails.addHandlerBackToHome(controlBackToHome);

  searchView.addHandlerSearch(controlSearch);

  cabinsView.addHandlerBookCabin(controlBookCabin);
  cabinsView.addHandlerUpdateGuests(controlUpdateGuests);
  cabinsView.addHandlerDeleteCabin(controlDeleteCabinFromCart);
  cabinsView.addHandlerShowDetails(controlCabinDetails);

  cabinDetails.addHandlerUpdateGuests(controlGuests);
  cabinDetails.addHandeleBookMark(controlBookMark);
  cabinDetails.addHandlerBookCabin(controlBookCabin);

  filtersView.addHandlerFilter(controlFilters);
  filtersView.addHandlerFilterClear(controlClearFilters);
  // filtersView.addHandlerPriceRange(controlFilters);
  cartView.addHandlerUpdateGuests(controlUpdateGuests);

  cartView.addHandlerDeleteCabin(controlDeleteCabinFromCart);
  cartView.addHandlerOrder(controlOrder);
};

init();

// Don't hungry for respect
// targets insecurities
// give cool reactions
