const display = document.querySelector('.ans');
const buttons = document.querySelectorAll('button');
const buttonsArray = Array.from(buttons);

let currentNumber = '';
let currentAnswer = null;
let sign = '';

buttonsArray.forEach(button => {
    button.addEventListener('click', () => {
        const content = button.textContent?.trim();
        handleInput(content);
    });
});

function handleInput(input) {
    // Handle clear
    if (input.toLowerCase() === "clear") {
        clearDisplay();
        return;
    }

    // Handle numbers
    if (!isNaN(+input)) {
        currentNumber += input;
        displayResult(currentNumber);
        return;
    }

    // Handle operations
    const signs = ["+", "-", "x", "/"];
    if (signs.includes(input)) {
        if (currentNumber !== '') {
            calculate();
        }
        sign = input;
        return;
    }

    // Handle equals
    if (input === "=") {
        calculate();
        sign = '';
        return;
    }
}

function displayResult(val) {
    display.textContent = val;
}

function clearDisplay() {
    currentAnswer = null;
    currentNumber = '';
    sign = '';
    displayResult("0");
}

function calculate() {
    const number = Number(currentNumber);
    if (currentAnswer === null) {
        currentAnswer = number;
    } else {
        switch (sign) {
            case '+': currentAnswer += number; break;
            case '-': currentAnswer -= number; break;
            case 'x': currentAnswer *= number; break;
            case '/':
                if (number === 0) {
                    displayResult("Error");
                    clearDisplay();
                    return;
                }
                currentAnswer /= number; break;
        }
    }
    currentNumber = '';
    displayResult(currentAnswer + "");
}
