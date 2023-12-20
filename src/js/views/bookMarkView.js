class BookMarkView {
  _parentElement = document.querySelector(".bookmarks__list");
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _generateMarkup() {
    return `${this._data.map(this._generateMarkupPreview)}`;
  }

  _generateMarkupPreview(preview) {
    const { id, name, image } = preview;
    const selectedId = window.location.hash.slice(1);
    console.log(id, selectedId);

    return `
            <li class="preview">
                <a class="preview__link  ${
                  Number(id) === Number(selectedId)
                    ? "preview__link--active"
                    : ""
                }" href="#${id}">
                <figure class="preview__fig">
                    <img src="${image}" alt="${name}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__name">
                    ${name}
                    </h4>
                    <p class="preview__publisher">The Pioneer Woman</p>
                </div>
                </a>
            </li>
        `;
  }
}

export default new BookMarkView();
