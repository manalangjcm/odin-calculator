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

inputContainer.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
        onClick(event.target);
    }
});

function onClick(target) {
    const dataInput = target.getAttribute("data-input");

    switch (dataInput) {
        case "operand": {
            if (outputTextCached.length >= 9) break;

            const operandValue = Number(target.value);
            
            insertToOutput(operandValue);
            break;
        }

        case "operator": {
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

            console.log("Operator clicked!");

            break;
        }

        case "decimal": {
            if (outputTextCached.includes(".")) break;

            if (isOutputZero()) {
                outputText.textContent = "0.";
                outputTextCached.push(0);
            } else {
                outputText.textContent += ".";
            }

            outputTextCached.push(".");
            console.log(outputTextCached);

            break;
        }

        case "clear": {
            clear();
            break;
        }

        case "backspace": {
            backspace();
            break;
        }

        case "equal": {
            if (outputTextCached.length > 0 && inputData.operandB === 0) {
                inputData.operandB = outputTextCached.join('');
            }

            operate(inputData);
            break;
        }
    }
}

function isOutputZero() {
    return outputTextCached.length <= 0 || outputText.textContent == "0";
}

function insertToOutput(value) {
    if (isOutputZero()) {
        outputText.textContent = value;
    } else {
        outputText.textContent += value;
    }
    
    outputTextCached.push(value);
}

function clear() {
    inputData = {
        operator: null,
        operandA: 0,
        operandB: 0
    }

    outputText.textContent = 0;
    outputTextCached = [];

    console.clear();
}

function backspace() {
    outputTextCached.pop();

    if (outputTextCached.length > 0) {
        outputText.textContent = outputTextCached.join('');
    } else {
        outputText.textContent = 0;
    }
}

function operate(inputData) {
    if (inputData.operator === null) return;
    
    const operandA = Number(inputData.operandA);
    const operandB = Number(inputData.operandB) === 0 ? operandA : Number(inputData.operandB);
    console.log(inputData);

    let result = 0;

    switch (inputData.operator) {
        case "add": {
            result = add(operandA, operandB);
            break;
        }

        case "subtract": {
            result = subtract(operandA, operandB);
            break;
        }

        case "multiply": {
            result = multiply(operandA, operandB);
            break;
        }

        case "divide": {
            result = divide(operandA, operandB);
            break;
        }
    }
    
    outputText.textContent = result;

    inputData.operator = null;
    inputData.operandA = result;
    inputData.operandB = 0;
    
    outputTextCached = [];

    console.log(`${operandA} ${inputData.operator} ${operandB} = ${result}`);
}

// Math Operation Functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}