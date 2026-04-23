const display = document.getElementById('display');

function append(value) {
  display.textContent += value;
}

function clearDisplay() {
  display.textContent = '';
}

function calculate() {
  try {
    const result = eval(display.textContent);
    display.textContent = result;
  } catch {
    display.textContent = 'Error';
  }
}