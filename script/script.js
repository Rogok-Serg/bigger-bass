// document.addEventListener("DOMContentLoaded", () => {
//   const loader = document.getElementById("loader");
//   const startPopup = document.getElementById("start-popup");
//   const gameContainer = document.getElementById("game-container");
//   const winPopup = document.getElementById("win-popup");
//   const activateBtn = document.getElementById("activate-btn");
//   const spinBtn = document.getElementById("spin-btn");
//   const freeSpinsDisplay = document.getElementById("free-spins");
//   let freeSpins = 3;

//   // Simulate loading
//   // setTimeout(() => {
//   //   startPopup.classList.add("hidden");
//   //   loader.classList.remove("hidden");
//   // }, 2000);

//   // Activate game
//   activateBtn.addEventListener("click", () => {
//     startPopup.classList.add("hidden");
//     gameContainer.classList.remove("hidden");
//   });

//   // Spin logic
//   spinBtn.addEventListener("click", () => {
//     if (freeSpins > 0) {
//       freeSpins--;
//       freeSpinsDisplay.textContent = freeSpins;
//       spinReels();
//       if (freeSpins === 0) {
//         setTimeout(() => {
//           winPopup.classList.remove("hidden");
//         }, 2000);
//       }
//     }
//   });

//   function spinReels() {
//     document.querySelectorAll(".reel").forEach((reel) => {
//       reel.textContent = getRandomSymbol();
//     });
//   }

//   function getRandomSymbol() {
//     const symbols = ["A", "K", "Q", "J", "10", "Fish", "Hook", "Boat"];
//     return symbols[Math.floor(Math.random() * symbols.length)];
//   }
// });
// const refs = {
//   reel1: document.getElementById("reel1-row1"),
//   reel2: document.getElementById("reel1-row1"),
//   reel3: document.getElementById("reel1-row1"),
// };

// function onCreateMarkupSlot() {
//   return (refs.reel1.innerHTML = `<img src="./images/slot_1.webp" alt="" />`);
// }
// console.log(onCreateMarkupSlot());

// document.addEventListener("DOMContentLoaded", () => {
//   const loader = document.getElementById("loader");
//   const startPopup = document.getElementById("start-popup");
//   const gameContainer = document.getElementById("game-container");
//   const winPopup = document.getElementById("win-popup");
//   const activateBtn = document.getElementById("activate-btn");
//   const spinBtn = document.getElementById("spin-btn");
//   const freeSpinsDisplay = document.getElementById("free-spins");

//   let freeSpins = 3;
//   const symbols = ["🍒", "🍋", "🍊", "🍉", "⭐", "🔔", "💎"];
//   const reels = document.querySelectorAll(".reel");

//   // Simulate loader
//   // setTimeout(() => {
//   //   loader.classList.add("hidden");
//   //   startPopup.classList.remove("hidden");
//   // }, 1500);

//   activateBtn.addEventListener("click", () => {
//     startPopup.classList.add("hidden");
//     gameContainer.classList.remove("hidden");
//   });

//   spinBtn.addEventListener("click", () => {
//     if (freeSpins <= 0) return;
//     freeSpins--;
//     freeSpinsDisplay.textContent = freeSpins;

//     // Simulate spinning animation
//     reels.forEach((reel, index) => {
//       reel.querySelectorAll(".symbol").forEach((symbol, rowIndex) => {
//         let randomSymbol;
//         if (freeSpins === 0 && rowIndex === 1) {
//           // Last spin must be a winning combination in the middle row
//           randomSymbol = "💎";
//         } else {
//           randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
//         }
//         symbol.textContent = randomSymbol;
//       });
//     });

//     if (freeSpins === 0) {
//       setTimeout(() => {
//         winPopup.classList.remove("hidden");
//       }, 1000);
//     }
//   });
// });
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  loader.style.display = "none"; // При завантаженні сторінки ховаємо лоадер
});
document.addEventListener("DOMContentLoaded", async () => {
  // const loader = document.getElementById("loader");
  const startPopup = document.getElementById("start-popup");
  const gameContainer = document.getElementById("game-container");
  const winPopup = document.getElementById("win-popup");
  const activateBtn = document.getElementById("activate-btn");
  const spinBtn = document.getElementById("spin-btn");
  const freeSpinsDisplay = document.getElementById("free-spins");
  const backdrop = document.getElementById("backdrop");
  const reels = document.querySelectorAll(".reel");

  backdrop.classList.add("backdrop");
  // document.body.appendChild(backdrop);

  // hidePopup(winPopup);
  showPopup(startPopup);

  function showPopup(popup) {
    popup.classList.remove("hidden");
    backdrop.classList.remove("hidden");
    document.body.classList.add("no-scroll");
  }

  function hidePopup(popup) {
    popup.classList.add("hidden");
    backdrop.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  }

  activateBtn.addEventListener("click", () => {
    hidePopup(startPopup);
    gameContainer.classList.remove("hidden");
  });

  let freeSpins = 3;
  let symbols = [];

  // Initialize slot machine with images
  const initializeSlotMachine = () => {
    reels.forEach((reel) => {
      reel.innerHTML = "";
      for (let i = 0; i < 3; i++) {
        const img = document.createElement("img");
        img.classList.add("symbol");
        img.src = symbols[Math.floor(Math.random() * symbols.length)];
        img.alt = "slot symbol";
        reel.appendChild(img);
      }
    });
  };

  try {
    const response = await fetch("/symbols.json");
    const data = await response.json();
    symbols = data.symbols;
    initializeSlotMachine(); // Ensure initialization happens only after loading symbols
  } catch (error) {
    console.error("Error loading symbols:", error);
  }

  spinBtn.addEventListener("click", () => {
    if (freeSpins <= 0) return;
    freeSpins--;
    freeSpinsDisplay.textContent = freeSpins;

    // Simulate spinning animation
    reels.forEach((reel, index) => {
      const symbolsInReel = reel.querySelectorAll(".symbol");
      symbolsInReel.forEach((symbol, rowIndex) => {
        let randomSymbol;
        if (freeSpins === 0 && rowIndex === 1) {
          // Last spin must be a winning combination in the middle row
          randomSymbol = symbols[5]; // First image in JSON as a winning symbol
        } else {
          randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        }
        symbol.src = randomSymbol;
      });
    });

    if (freeSpins === 0) {
      setTimeout(() => showPopup(winPopup), 2000);
    }
  });
});
