const display = document.getElementById('display');

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