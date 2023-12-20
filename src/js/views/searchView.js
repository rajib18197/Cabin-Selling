class SearchView {
  _parentElement = document.querySelector(".search");

  getSearchTerm() {
    const value = this._parentElement.querySelector(".search__field").value;
    this._parentElement.querySelector(".search__field").value = "";

    return value;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
