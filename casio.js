const display = document.getElementById('displayText');
const memoryIndicator = document.getElementById('memoryIndicator');

let currentInput = '0';
let currentOperator = null;
let previousInput = null;
let memory = 0;
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentInput;
  if (display.textContent.length > 12) {
    display.textContent = display.textContent.substring(0, 12);
  }
}

function updateMemoryIndicator() {
  if (memory !== 0) {
    memoryIndicator.classList.add('active');
    memoryIndicator.textContent = 'M';
  } else {
    memoryIndicator.classList.remove('active');
    memoryIndicator.textContent = '';
  }
}

function append(value) {
  if (value === '+' || value === '-' || value === '*' || value === '/') {
    setOperator(value);
  } else {
    appendNumber(value);
  }
}

function appendNumber(value) {
  if (shouldResetDisplay) {
    currentInput = '';
    shouldResetDisplay = false;
  }
  
  if (value === '.') {
    if (currentInput.includes('.')) return;
    if (currentInput === '') {
      currentInput = '0.';
    } else {
      currentInput += '.';
    }
  } else if (currentInput === '0' && value !== '.') {
    currentInput = value;
  } else {
    currentInput += value;
  }
  
  updateDisplay();
}

function setOperator(op) {
  if (previousInput !== null && currentOperator !== null && !shouldResetDisplay) {
    calculate();
  }
  previousInput = currentInput;
  currentOperator = op;
  shouldResetDisplay = true;
}

function clearEntry() {
  currentInput = '0';
  updateDisplay();
}

function allClear() {
  currentInput = '0';
  currentOperator = null;
  previousInput = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function calculate() {
  if (previousInput === null || currentOperator === null) return;
  
  let result;
  const current = parseFloat(currentInput);
  const previous = parseFloat(previousInput);
  
  switch (currentOperator) {
    case '+':
      result = previous + current;
      break;
    case '-':
      result = previous - current;
      break;
    case '*':
      result = previous * current;
      break;
    case '/':
      if (current === 0) {
        currentInput = 'Error';
        updateDisplay();
        return;
      }
      result = previous / current;
      break;
    case '%':
      result = previous * (current / 100);
      break;
    default:
      return;
  }
  
  currentInput = result.toString();
  if (currentInput.length > 12) {
    currentInput = parseFloat(result.toPrecision(10)).toString();
  }
  currentOperator = null;
  previousInput = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function memoryPlus() {
  memory += parseFloat(currentInput) || 0;
  shouldResetDisplay = true;
  updateMemoryIndicator();
}

function memoryMinus() {
  memory -= parseFloat(currentInput) || 0;
  shouldResetDisplay = true;
  updateMemoryIndicator();
}

function memoryRecall() {
  currentInput = memory.toString();
  shouldResetDisplay = true;
  updateDisplay();
}

function memoryClear() {
  memory = 0;
  updateMemoryIndicator();
}