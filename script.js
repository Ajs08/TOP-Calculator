const screen = document.querySelector("#calculator-screen");

const allBtns = document.querySelectorAll("button");

const numberBtns = document.querySelectorAll(".btn.number");
const clearBtn = document.querySelector("#clear");
const delBtn = document.querySelector("#delete");

const equalBtn = document.querySelector("#equal");

function simpleCalc(string) {
    const operators = ["+", "-", "x", "÷"];
    let stringOperator = "";

    for (const operator of operators) {
        if (string.includes(operator)) {
            stringOperator = operator;
            break;
        }
    }

    // The previous loop is equivalent to this code => const stringOperator = operators.find(op => string.includes(op));

    const [leftValue, rightValue] = string.split(stringOperator).map(value => Number(value));

    switch (stringOperator) {
        case "+": return leftValue + rightValue;
        case "-": return leftValue - rightValue;
        case "x": return leftValue * rightValue;
        case "÷": return leftValue / rightValue;
        default: return "Unable to perform expression, unknown operator."
    }
}

allBtns.forEach(
    button => button.addEventListener("click", () => {
        if (button.classList.contains("number") || button.classList.contains("operation")) {
            screen.textContent += button.textContent;
        }
    })
);

clearBtn.addEventListener("click", () => {screen.textContent = ""});

delBtn.addEventListener("click", () => {
    const stringArray = screen.textContent.split("");
    stringArray.pop();
    screen.textContent = stringArray.join("");
});

equalBtn.addEventListener("click", () => { 
    screen.textContent = simpleCalc(screen.textContent); 
});