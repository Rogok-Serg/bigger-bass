document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("timer-display");
  let timeLeft = 15 * 60; // 15 хвилин у секундах

  function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    display.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (timeLeft > 0) {
      timeLeft--;
    } else {
      clearInterval(timerInterval);
      display.textContent = "Time's up!";
    }
  }

  updateTimer(); // Початкове оновлення таймера
  const timerInterval = setInterval(updateTimer, 1000);
});
