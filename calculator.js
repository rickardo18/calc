document.addEventListener('DOMContentLoaded', function () {
  const equationDisplay = document.querySelector('.calculator-equation');
  const resultDisplay = document.querySelector('.calculator-result');
  const buttons = document.querySelectorAll('.btn');

  let equation = '';
  let result = '';

  function updateDisplay() {
    equationDisplay.textContent = equation || '0';
    resultDisplay.textContent = result ? '=' + result : '';
  }

  function calculate() {
    try {
      // Only allow safe characters
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
      if (btn.classList.contains('btn-eq')) {
        calculate();
        return;
      }
      if (btn.classList.contains('btn-ac')) {
        equation = '';
        result = '';
        updateDisplay();
        return;
      }
      if (btn.classList.contains('btn-del')) {
        equation = equation.slice(0, -1);
        updateDisplay();
        return;
      }
      if (btn.classList.contains('btn-func')) {
        // Ignore scientific buttons for now
        return;
      }
      if (btn.classList.contains('btn-zero')) {
        equation += '0';
        updateDisplay();
        return;
      }
      if (btn.classList.contains('btn-op')) {
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
