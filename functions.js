const buttons = document.querySelectorAll(".calculator-items");
const display = document.querySelector(".display p");
const clearAll = document.querySelector(".clear-all-button");
const clearButton = document.querySelector(".clear-button");
const equalsButton = document.querySelector(".equals-button");
const operatorsRegExpression = /(\+|\-|\*|÷)/;
const lastKeyPressed = [];
const operators = ["+", "-", "*", "÷"];
let equalsPressed = false;
display.textContent = 0;

clearAll.addEventListener("click", (e) => {
  e.stopPropagation();
  equalsPressed = false;
  display.textContent = "0";
});

clearButton.addEventListener("click", () => {
  let newDisplay;
  newDisplay = display.textContent.slice(0, -1);
  display.textContent = newDisplay;
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    displayEquation(button);
  });
});

equalsButton.addEventListener("click", () => {
  equalsPressed = true;
  const equation = display.textContent.split(operatorsRegExpression);
  calculate(equation);
  lastKeyPressed.splice(0, lastKeyPressed.length - 1);
});

//& -If the last input was a operator, the next input can't be a operator
//& -If you touch equals button, the next input can't be a number, only operator.

function displayEquation(button) {
  let operatorPressed = false;
  lastKeyPressed.push(button.textContent);
  console.log(lastKeyPressed);
  for (let i = 0; i < operators.length; i++) {
    if (
      lastKeyPressed[lastKeyPressed.length - 2] === operators[i] &&
      (button.textContent === "+" ||
        button.textContent === "-" ||
        button.textContent === "*" ||
        button.textContent === "÷") &&
      !equalsPressed
    ) {
      display.textContent += "";
      lastKeyPressed.pop();
      operatorPressed = true;
    } else if (
      equalsPressed &&
      (button.textContent === "+" ||
        button.textContent === "-" ||
        button.textContent === "*" ||
        button.textContent === "÷")
    ) {
      display.textContent += button.textContent;
      equalsPressed = false;
      operatorPressed = true;
    }
  }
  if (!operatorPressed && !equalsPressed) {
    if (
      display.textContent === "0" &&
      button.textContent != "0" &&
      button.textContent != "+" &&
      button.textContent != "-" &&
      button.textContent != "*" &&
      button.textContent != "÷"
    ) {
      display.textContent = button.textContent;
    } else if (display.textContent === "0" && button.textContent === "0") {
      display.textContent = "0";
    } else {
      display.textContent += button.textContent;
    }
  }

  operatorPressed = false;
}

//& Calculate the equation
function calculate(equation) {
  let multiplicationsResult = 0;
  let divisions = 0;
  let sums = 0;
  let subtractions = 0;
  let divideByZero = false;

  //^ It does the multiplications and divisions first
  for (let i = 0; i < equation.length; i++) {
    if (equation[i] === "*") {
      multiplicationsResult = Number(equation[i - 1]) * Number(equation[i + 1]);
      equation.splice(i - 1, 3, multiplicationsResult);
      i--;
    } else if (equation[i] === "÷") {
      if (equation[i + 1] === "0") {
        divideByZero = true;
        display.textContent = "Syntax Error";
        return false;
      }
      divisions = Number(equation[i - 1]) / Number(equation[i + 1]);
      equation.splice(i - 1, 3, divisions);
      i--;
    }
  }

  // ^It does the sums and subtractions
  for (let i = 0; i < equation.length; i++) {
    if (equation[i] === "+") {
      sums = Number(equation[i - 1]) + Number(equation[i + 1]);
      equation.splice(i - 1, 3, sums);
      i--;
    } else if (equation[i] === "-") {
      subtractions = Number(equation[i - 1]) - Number(equation[i + 1]);
      equation.splice(i - 1, 3, subtractions);
      i--;
    }
  }

  // ^ Check if the division returns 0
  if (!divideByZero) {
    if (hasDecimals(equation[0])) {
      display.textContent = equation[0].toFixed(4);
    } else if (!isNaN(equation[0])) {
      display.textContent = equation[0];
    } else {
      display.textContent = "Syntax Error";
    }
  }
}

//& Check if the final result has decimals
function hasDecimals(number) {
  return number !== Math.trunc(number);
}
