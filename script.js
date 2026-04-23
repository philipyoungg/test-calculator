const display = document.getElementById('display');
let darkMode = false;

function append(value) {
  display.textContent += value;
}

function clearDisplay() {
  display.textContent = '';
}

function calculate() {
  try {
    let expr = display.textContent;
    expr = expr.replace(/(\d+)%/g, '$1/100');
    const result = eval(expr);
    display.textContent = result;
  } catch {
    display.textContent = 'Error';
  }
}

function toggleDarkMode() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark', darkMode);
  document.querySelector('.calculator').classList.toggle('dark', darkMode);
}