import icons from "../../img/icons.svg";

class BookedCabinView {
  _parentElement = document.querySelector(".cabins");
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
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

  _generateMarkup() {
    const {
      fullName,
      address,
      email,
      guests,
      totalPrice,
      luxuryCabins,
      status,
      contact,
    } = this._data;

    return `
			<div class="booked">
				<div class="booked__details">
					<h3>${fullName}</h3>
					<p>${email}</p>
					<p>${address}</p>
					<p class="booked__status">${status}</p>
				</div>

				<div class="booked__info">
					${this._generateMarkupCabin(luxuryCabins, guests, totalPrice)}
				</div>

				<div class="booked__contact">${
          status === "pending"
            ? `<p>We appreciate your patience. We will soon contact you! Our Phone: ${contact}</p>`
            : `<p>We gave all the details in your email. Happy journey. See you there!</p>`
        }
					<button class="btn--back">Back To Home</button>
				</div>


		  </div>
    `;
  }

  _generateMarkupCabin(cabin, guests, totalPrice) {
    const { id, image, name, maxCapacity, address, regularPrice, discount } =
      cabin;

    return `
      <div class="booked__cabin" data-cabin=${id}>
        <img class="booked__img" src=${image} alt=${name}>
        <div class="booked__overview">
          <h3 class="booked__name">${name}</h3>
          <p class="booked__address">${address}</p>
        </div>
        <p class="booked__guests">You booked this cabin with ${guests} peoples</p>
				<p class="booked__price">Your Total Price is: ${totalPrice}</p>
      </div>
    `;
  }
}

export default new BookedCabinView();
