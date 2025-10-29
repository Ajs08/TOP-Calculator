const screen = document.querySelector("#calculator-screen");

const numberBtns = document.querySelectorAll(".btn.number");
const operationBtns = document.querySelectorAll(".btn.basic-operation");
const percentageBtn = document.querySelector(".btn.complex-operation");

const clearBtn = document.querySelector("#clear");
const delBtn = document.querySelector("#delete");
const equalBtn = document.querySelector("#equal");

function searchOperator(string) {
    const operators = ["+", "-", "x", "÷"];
    const stringOperator = operators.find(op => string.includes(op));

    /* 
    for (const operator of operators) {
        if (string.includes(operator)) {
            stringOperator = operator;
            break;
        }
    } The previous line of code is equivalent to this snippet
    */

    return stringOperator;
}

function simpleOperation(string) {
    const operator = searchOperator(string);
    const [left, right] = string.split(operator);

    const leftValue = Number(left);
    const rightValue = right.endsWith("%")
        ? Number(right.split("%")[0]) / 100
        : Number(right);

    switch (operator) {
        case "+": 
            return right.endsWith("%")
                ? leftValue + leftValue * rightValue
                : leftValue + rightValue;

        case "-": 
            return right.endsWith("%")
                ? leftValue - leftValue * rightValue
                : leftValue - rightValue;

        case "x": 
            return leftValue * rightValue;

        case "÷": 
            return rightValue === 0 ? "Can't divide by zero" : leftValue / rightValue;

        default: 
            return "Unable to perform expression, unknown operator.";
    }
}

numberBtns.forEach(button => button.addEventListener("click", () => { screen.textContent += button.textContent }));

operationBtns.forEach(
    button => button.addEventListener("click", () => {
        const operator = searchOperator(screen.textContent);
        const hasOperator = operator ? true : false;

        if (hasOperator) {
            const [leftValue, rightValue] = screen.textContent.split(operator);

            const operationString = [leftValue, operator, rightValue];
            const validString = operationString.filter(x => x != undefined).length;

            console.log(operationString);
            console.log(validString);

            if (validString === 3) {
                screen.textContent = simpleOperation(screen.textContent);
                screen.textContent += button.textContent;
            } else {
                screen.textContent += button.textContent;
            }
        } else {
            screen.textContent += button.textContent;
        }
    })
);

percentageBtn.addEventListener("click", () => {
  if (!screen.textContent.endsWith("%")) {
    screen.textContent += "%";
  }
});

clearBtn.addEventListener("click", () => {screen.textContent = ""});

delBtn.addEventListener("click", () => {
    const stringArray = screen.textContent.split("");
    stringArray.pop();
    screen.textContent = stringArray.join("");
});

equalBtn.addEventListener("click", () => { 
    screen.textContent = screen.textContent === "" ? "0" : simpleOperation(screen.textContent);
});