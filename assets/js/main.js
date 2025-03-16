// DOM References
const outputText = document.querySelector("#output-container__text");
const inputContainer = document.querySelector("#input-container");

// Calculator Data
let inputData = {
    operator: null,
    operandA: 0,
    operandB: 0
};

let outputTextCached = [];

// Event Listener
inputContainer.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
        handleButtonClick(event.target);
    }
});

// Keyboard Support
window.addEventListener("keydown", event => {
    const clickedButton = document.querySelector(`#input-container button[data-key='${event.key}']`);
    if (clickedButton !== null) clickedButton.click();
});

function handleButtonClick(target) {
    const dataInput = target.getAttribute("data-input");
    const value = target.value;

    switch (dataInput) {
        case "clear": resetCalculator(); break;
        case "backspace": removeLastDigit(); break;
        case "decimal": addDecimal(); break;
        case "equal": operate(inputData); break;
        case "operand": addDigit(value); break;
        case "operator": setOperator(target); break;
        case "percent": percentage(); break;
        case "sign": toggleSign(); break;
    }
}

function addDecimal() {
    if (outputTextCached.includes(".")) return;

    if (isOutputZero()) {
        outputText.textContent = "0.";
        outputTextCached.push(0);
    } else {
        outputText.textContent += ".";
    }

    outputTextCached.push(".");
}

function addDigit(value) {
    if (outputTextCached.length >= 9) return;

    if (isOutputZero()) {
        outputText.textContent = value;
    } else {
        outputText.textContent += value;
    }
    
    outputTextCached.push(value);
}

function setOperator(target) {
    if (inputData.operator === null) {
        inputData.operator = target.value;

        if (inputData.operandA === 0) {
            inputData.operandA = outputTextCached.join('');
            outputTextCached = [];
        }
    } else {
        if (inputData.operandA !== 0 && inputData.operandB === 0) {
            inputData.operandB = outputTextCached.join('');
            outputTextCached = [];

            operate(inputData);
        }

        inputData.operator = target.value;
    }
}

function operate(inputData) {
    if (outputTextCached.length > 0 && inputData.operandB === 0) {
        inputData.operandB = outputTextCached.join('');
    }

    if (inputData.operator === null) return;
    
    const operator = inputData.operator;
    const operandA = Number(inputData.operandA);
    const operandB = Number(inputData.operandB) === 0 ? operandA : Number(inputData.operandB);

    // Easter egg - dividing 0 and 0
    if ((operandA === 0 && operandB === 0) && operator === "divide") {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        resetCalculator();        
        outputText.textContent = "why...";
        return;
    }

    let result = 0;
    switch (operator) {
        case "add": result = operandA + operandB; break;
        case "subtract": result = operandA - operandB; break;
        case "multiply": result = operandA * operandB; break;
        case "divide": result = operandA / operandB; break;
    }

    const roundResult = round(result, 15);
    outputText.textContent = roundResult.toString().slice(0, 9);

    inputData.operator = null;
    inputData.operandA = roundResult;
    inputData.operandB = 0;

    outputTextCached = [];
}

function percentage() {
    if (isOutputZero()) return;

    const percentageValue = Number(outputTextCached.join('')) / 100;
    outputTextCached = Array.from(percentageValue.toString().split(''));
    outputText.textContent = outputTextCached.join('').substring(0, 9);
}

function toggleSign() {
    if (isOutputZero()) {
        // If current textContent has a number other than zero, allow toggling sign
        if (outputText.textContent !== "0") {
            outputTextCached = Array.from(outputText.textContent.toString().split(''));
        } else {
            return;
        }
    }

    if (!outputTextCached.includes("-")) {
        outputTextCached.unshift("-");
    } else {
        outputTextCached.shift();
    }

    outputText.textContent = outputTextCached.join('').substring(0, 9);
}

// Helper Functions
function isOutputZero() {
    return outputTextCached.length === 0 || outputText.textContent === "0";
}

function removeLastDigit() {
    outputTextCached.pop();
    outputText.textContent = outputTextCached.length ? outputTextCached.join('') : "0";
}

function resetCalculator() {
    inputData = {
        operator: null,
        operandA: 0,
        operandB: 0
    }

    outputTextCached = [];
    outputText.textContent = 0;

    console.clear();
}

function round(number, decimals) {
    return parseFloat(Math.round(number + 'e' + decimals) + 'e-' + decimals);
}