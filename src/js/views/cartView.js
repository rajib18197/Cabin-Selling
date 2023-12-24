class CartView {
  _overlay = document.querySelector(".overlay");
  _addRecipeWindow = document.querySelector(".create-order-window");
  _btnClose = document.querySelector(".btn--close-modal");

  _parentElement = document.querySelector(".nav__btn--cart");
  _cartContainer = document.querySelector(".cart");
  _bookElement = document.querySelector(".book");
  _orderBtn = document.querySelector(".btn--order-up");

  _data;
  _successMsg =
    "Your Order was successfully completed. We will be contact you very soon.";

  constructor() {
    this.addHandlerCartListModal();
    this.addHandlerCloseModal();
    this.addHandlerShowProceedForm();
  }

  render(data) {
    this._data = data;
    if (!this._data) return;
    this._updateCartMarkup();
    this.setOrderBtnContent();

    if (!this._overlay.classList.contains(".hidden")) {
      const markup = this._generateCartListMarkup();
      this._cartContainer.innerHTML = "";
      this._cartContainer.insertAdjacentHTML("beforeend", markup);
    }
  }

  addHandleCloseSucces(handler) {
    this._addRecipeWindow.addEventListener("click", function (e) {
      console.log(e.target);
      if (e.target.closest(".btn--ok")) {
        handler();
      }
    });
  }

  renderSuccess(msg = this._successMsg) {
    const markup = `
      <div class="success">
        <div>
          <svg>
            <use href="img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>Your order was completed successfully. Order Id: ${msg} for further lookup.</p>
        <button class="btn--ok">Proceed</button>
      </div>
  `;

    this._cartContainer.classList.add("hidden");
    this._bookElement.classList.add("hidden");
    this._addRecipeWindow.insertAdjacentHTML("afterbegin", markup);

    // setTimeout(() => {
    //   this._addRecipeWindow.querySelector(".success").style.display = "none";
    //   this._addRecipeWindow.classList.add("hidden");
    //   this._overlay.classList.add("hidden");
    // }, 2000);
  }

  _updateCartMarkup() {
    const guests = this._data.results.reduce((acc, cur) => {
      return acc + cur.guests;
    }, 0);

    this._parentElement.querySelector(".guest-number").textContent =
      guests || "Your Cart";
  }

  addHandlerCartListModal() {
    this._parentElement.addEventListener(
      "click",
      function () {
        this.addHandlerOpenModal();
        if (!this._data) return;
        const markup = this._generateCartListMarkup();
        this._cartContainer.innerHTML = "";
        this._bookElement.classList.add("hidden");
        this._cartContainer.insertAdjacentHTML("beforeend", markup);
      }.bind(this)
    );
  }

  closeModal() {
    this._overlay.classList.add("hidden");
    this._addRecipeWindow.classList.add("hidden");
  }

  addHandlerOpenModal() {
    this._overlay.classList.remove("hidden");
    this._addRecipeWindow.classList.remove("hidden");
  }

  addHandlerCloseModal() {
    this._btnClose.addEventListener("click", this.closeModal.bind(this));
    this._overlay.addEventListener("click", this.closeModal.bind(this));
  }

  addHandlerUpdateGuests(handler) {
    this._cartContainer.addEventListener("click", function (e) {
      if (e.target.closest(".btn--update")) {
        // In dataset object camelCase notation doesnot work, I.E. 'maxGuests' is written in camelCase but if you inspect html then you see it's actually written 'maxguests'
        const maxGuests = Number(
          e.target.closest(".btn--update").dataset.maxguests
        );
        const updateTo = Number(
          e.target.closest(".btn--update").dataset.update
        );
        const cabinId = Number(e.target.closest(".cart__item").dataset.cabin);
        console.log(updateTo, maxGuests);

        if (updateTo > maxGuests) return;
        if (updateTo === 0) return;

        handler(updateTo, cabinId);
      }
    });
  }

  addHandlerDeleteCabin(handler) {
    this._cartContainer.addEventListener("click", function (e) {
      if (e.target.closest(".btn--delete")) {
        const cabinId = Number(e.target.closest(".cart__item").dataset.cabin);
        handler(cabinId);
      }
    });
  }

  addHandlerShowProceedForm() {
    this._cartContainer.addEventListener(
      "click",
      function (e) {
        if (e.target.closest(".btn--proceed")) {
          this._bookElement.classList.remove("hidden");
        }
      }.bind(this)
    );
  }

  renderSpinner() {
    this._orderBtn.innerHTML = "";
    this._orderBtn.textContent = "Placing Order";
  }

  setOrderBtnContent() {
    this._orderBtn.innerHTML = "";
    this._orderBtn.textContent = "Order from $1200";
  }

  addHandlerOrder(handler) {
    this._bookElement
      .querySelector(".form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const fullName = this.querySelector(".form__input-name").value;
        const email = this.querySelector(".form__input-email").value;
        const address = this.querySelector(".form__input-address").value;
        console.log(fullName, email, address);

        // const dataArr = [...new FormData(this)];
        // const data = Object.fromEntries(dataArr);
        // console.log(data);

        handler({ fullName, email, address });
      });
  }

  _generateCartListMarkup() {
    console.log(this._data?.results);
    return `
        <ul class="cart__list">
           ${this._data?.results?.map(this._generateCartItem)}
        </ul>
       ${
         this._data?.results.length
           ? `<div class="cart__action">
            <button class="btn--proceed">Proceed</button>
            <button>Clear</button>
        </div>`
           : ""
       }
    `;
  }

  _generateCartItem(cart) {
    const {
      id,
      image,
      name,
      maxCapacity,
      address,
      regularPrice,
      discount,
      guests,
    } = cart;
    const totalPrice = guests * regularPrice;

    return `
        <li class="cart__item" data-cabin=${id}>
            <span>${guests} Guests</span>
            <h3>${name}</h3>
            <p>Total Price: $${totalPrice}</p>
            <div class="cabin__guests">
                <div class="guests__control">
                <button
                    class="btn-round btn--update"
                    data-update="${guests + 1}"
                    data-maxGuests="${maxCapacity}"
                >
                    +
                </button>
                <p class="cabin__guests--count">${guests}</p>
                <button
                    class="btn-round btn--update"
                    data-update="${guests - 1}"
                >
                    -
                </button>
                </div>
            </div>
            <button class="btn--delete">Delete Cabin</button>
            </li>
    `;
  }
}

export default new CartView();
