let buttons = document.querySelectorAll(".calculator-items");
const operators = document.querySelectorAll(".operators");
let display = document.querySelector(".display");
let clearAll = document.querySelector(".clear-all-button");
let clearLastNumber = document.querySelector(".clear-button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (display.textContent === "0") {
      display.textContent = button.textContent.trim();
    } else {
      display.textContent += button.textContent.trim();
    }
  });
});

clearAll.addEventListener("click", () => {
  display.textContent = "0";
});

clearLastNumber.addEventListener("click", () => {
  display.textContent -= display.textContent.slice(-1, 1);
});
