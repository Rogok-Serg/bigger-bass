let touchStartY = 0;
let touchEndY = 0;

window.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].screenY;
});

window.addEventListener("touchmove", (e) => {
  touchEndY = e.changedTouches[0].screenY;
});

window.addEventListener("touchend", () => {
  if (touchEndY > touchStartY + 180) {
    // перевірка, чи свайп був достатньо довгим
    location.reload(); // оновлення сторінки
  }
});
