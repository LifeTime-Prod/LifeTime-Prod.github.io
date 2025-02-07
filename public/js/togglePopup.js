document.addEventListener('DOMContentLoaded', () => {
  const popupOverlay = document.querySelector(".popup-overlay");
  const skipButton = document.querySelector(".popup-container .skip-button");

  if (!popupOverlay || !skipButton) {
      console.error("Required elements not found in the DOM.");
      return;
  }

  const showAd = () => {
      popupOverlay.classList.add("active");
  };

  const closeAd = () => {
      popupOverlay.classList.remove("active");
  };

  skipButton.addEventListener("click", closeAd);

  const startTimer = () => {
      if (window.scrollY > 100) {
          showAd();
          window.removeEventListener("scroll", startTimer);
      }
  };

  window.addEventListener("scroll", startTimer);
});