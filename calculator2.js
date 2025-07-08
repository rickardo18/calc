document.addEventListener('DOMContentLoaded', function () {
  const equationDisplay = document.getElementById('calc2-equation');
  const resultDisplay = document.getElementById('calc2-result');
  const buttons = document.querySelectorAll('.calc2-btn');

  let equation = '';
  let result = '';

  function updateDisplay() {
    equationDisplay.textContent = equation || '0';
    resultDisplay.textContent = result ? '=' + result : '';
  }

  function calculate() {
    try {
      if (/^[0-9+\-*/.() ]+$/.test(equation)) {
        // eslint-disable-next-line no-eval
        let evalResult = eval(equation);
        if (typeof evalResult === 'number' && isFinite(evalResult)) {
          result = evalResult.toLocaleString();
        } else {
          result = 'Error';
        }
      } else {
        result = 'Error';
      }
    } catch {
      result = 'Error';
    }
    updateDisplay();
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      const value = btn.textContent.trim();
      if (btn.classList.contains('calc2-eq')) {
        calculate();
        return;
      }
      if (btn.classList.contains('calc2-ac')) {
        equation = '';
        result = '';
        updateDisplay();
        return;
      }
      if (btn.classList.contains('calc2-del')) {
        equation = equation.slice(0, -1);
        updateDisplay();
        return;
      }
      if (btn.classList.contains('calc2-func')) {
        // Ignore scientific buttons for now
        return;
      }
      if (btn.classList.contains('calc2-zero')) {
        equation += '0';
        updateDisplay();
        return;
      }
      if (btn.classList.contains('calc2-op')) {
        equation += ' ' + value + ' ';
        updateDisplay();
        return;
      }
      // For numbers 1-9
      if (/^[0-9]$/.test(value)) {
        equation += value;
        updateDisplay();
        return;
      }
    });
  });

  // Initialize display
  updateDisplay();
});
