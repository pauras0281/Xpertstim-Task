const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

buttons.addEventListener("click", function (e) {
  const clickedButton = e.target;
  const value = clickedButton.textContent;

  
  if (clickedButton.tagName !== "BUTTON") return;

  if (value === "AC") {
    display.value = "";
  } else if (value === "C") {
    display.value = display.value.slice(0, -1);
  } else if (value === "=") {
    try {
      let expression = display.value;

     
      if (expression.includes("%")) {
        let newExpression = "";
        for (let i = 0; i < expression.length; i++) {
          if (expression[i] === "%") {
            newExpression += "/100";
          } else {
            newExpression += expression[i];
          }
        }
        expression = newExpression;
      }

      const result = eval(expression);
      display.value = result;
    } catch (error) {
      display.value = "Error";
      setTimeout(() => {
        display.value = "";
      }, 1500);
    }
  } else if (value === ".") {
    // Prevent multiple dots in a number
    const operators = ["+", "-", "*", "/"];
    let lastOperatorIndex = -1;

    for (let i = 0; i < display.value.length; i++) {
      if (operators.includes(display.value[i])) {
        lastOperatorIndex = i;
      }
    }

    let currentNumber = display.value.slice(lastOperatorIndex + 1);

    if (!currentNumber.includes(".")) {
      display.value += value;
    }
  } else {
    display.value += value;
  }
});
