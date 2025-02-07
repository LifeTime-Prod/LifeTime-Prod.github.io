// document.addEventListener('DOMContentLoaded', () => {
//   const popupOverlay = document.querySelector(".popup-overlay");
//   const skipButton = document.querySelector(".popup-container .skip-button");

//   if (!popupOverlay || !skipButton) {
//       console.error("Required elements not found in the DOM.");
//       return;
//   }

//   const showAd = () => {
//       popupOverlay.classList.add("active");
//   };

//   const closeAd = () => {
//       popupOverlay.classList.remove("active");
//       localStorage.setItem('popupShown', 'true');
//   };

//   skipButton.addEventListener("click", closeAd);

//   const startTimer = () => {
//       if (window.scrollY > 100) {
//           showAd();
//           window.removeEventListener("scroll", startTimer);
//       }
//   };

//   if (!localStorage.getItem('popupShown')) {
//       window.addEventListener("scroll", startTimer);
//   }
// });

$(document).ready(function() {
  const $popupOverlay = $(".popup-overlay");
  const $skipButton = $(".skip-button");

  if (!$popupOverlay.length || !$skipButton.length) {
      console.error("Required elements not found in the DOM.");
      return;
  }

  const showAd = () => {
      $popupOverlay.addClass("active");
  };

  const closeAd = () => {
      $popupOverlay.removeClass("active");
      localStorage.setItem('popupShown', 'true');
  };

  $skipButton.on("click", closeAd);

  const startTimer = () => {
      if ($(window).scrollTop() > 100) {
          showAd();
          $(window).off("scroll", startTimer);
      }
  };

  if (!localStorage.getItem('popupShown')) {
      $(window).on("scroll", startTimer);
  }
});