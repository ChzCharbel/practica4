let currentInput = "";
let previousInput = "";
let operation = null;
let calculated = false;
let lastResult = null; 

document.addEventListener("keydown", handleKeyboardInput);

function appendNumber(number) {
    if (calculated) {
        clearDisplay();
        calculated = false;
    }
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = currentInput || "0";
}

function chooseOperation(op) {
    if (currentInput === "") {
        clearDisplay();
        return;
    }
    if (previousInput !== "") calculate();
    operation = op;
    previousInput = currentInput;
    currentInput = "";
    calculated = false;
}

function calculate() {
    if (!operation) {
        clearDisplay();
        return;
    }

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    let result;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? "Error" : prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    lastResult = result;  
    updateDisplay();
    calculated = true;
    previousInput = "";
    operation = null;
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operation = null;
    calculated = false;
    updateDisplay();
}

function useLastResult() {
    if (lastResult !== null) {
        currentInput = lastResult.toString();
        updateDisplay();
    }
}

function handleKeyboardInput(e) {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        chooseOperation(e.key);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Escape' || e.key === 'Backspace') {
        clearDisplay();
    } else if (e.key === 'a' || e.key === 'A') {  
        useLastResult();
    }
}
