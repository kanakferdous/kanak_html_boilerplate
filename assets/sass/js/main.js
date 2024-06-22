// Scripts
const App = {
  init: function () {
    this.cacheDOMElements();
    this.bindEventListeners();
  },

  cacheDOMElements: function () {
    this.mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    this.navLinks = document.querySelector(".nav-links");
    this.dropdownToggles = document.querySelectorAll(".nav-links > li > a");
  },

  bindEventListeners: function () {
    this.mobileMenuToggle.addEventListener(
      "click",
      this.handleMobileMenuToggle.bind(this)
    );
    this.dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", this.handleDropdownToggle.bind(this));
    });
  },

  handleMobileMenuToggle: function () {
    this.navLinks.classList.toggle("active");
  },

  handleDropdownToggle: function (event) {
    const parentLi = event.target.parentElement;
    const dropdown = parentLi.querySelector(".dropdown");
    if (dropdown) {
      event.preventDefault();
      dropdown.classList.toggle("active");
    }
  },
};

document.addEventListener("DOMContentLoaded", function () {
  App.init();
});
