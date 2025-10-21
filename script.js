const resultScreen = document.querySelector("#calculator-screen");

const numberBtns = document.querySelectorAll(".btn.number");

numberBtns.forEach(
    button => button.addEventListener("click", () => {
        resultScreen.textContent = button.innerHTML;
    })
);