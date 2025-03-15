// DOM References
const outputText = document.querySelector("#output-container__text");
const inputContainer = document.querySelector("#input-container");

// Calculator Data
let inputData = {
    operator: null,
    operandA: null,
    operandB: null
};

inputContainer.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
        onClick(event.target);
    }
});

function onClick(target) {
    const dataInput = target.getAttribute("data-input");

    switch (dataInput) {
        case "operand": {
            const operandValue = Number(target.value);
            
            if (inputData.operandA !== null && inputData.operandB !== null) return;

            if (isOutputZero()) {
                outputText.textContent = operandValue
                return;
            }

            outputText.textContent += operandValue;
            
            break;
        }

        case "decimal": {
            if (isOutputZero()) return;
            if (Array.from(outputText.textContent).includes(".")) return;
            
            outputText.textContent += ".";
            
            break;
        }

        case "clear": {
            clear();
            break;
        }

        case "equal": {
            operate(inputData);
            break;
        }
    }
}

function isOutputZero() {
    return Number(outputText.textContent) == 0;
}

function insertOperand() {

}

function clear() {
    inputData = {
        operator: null,
        operandA: null,
        operandB: null
    }

    outputText.textContent = 0;
}

function operate(inputData = {}) {
    console.log(inputData);
}