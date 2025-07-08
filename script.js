document.addEventListener('DOMContentLoaded', function () {
  const expressionDisplay = document.querySelector('.display .expression');
  const resultDisplay = document.querySelector('.display .result');
  const buttons = document.querySelectorAll('.btn');

  let expression = '';
  let result = '';
  let lastInput = '';

  function updateDisplay() {
    expressionDisplay.textContent = expression || '0';
    resultDisplay.textContent = result ? '=' + result : '';
  }

  function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
  }

  function safeEval(expr) {
    try {
      // Replace unicode multiplication/division if present
      expr = expr.replace(/×/g, '*').replace(/÷/g, '/');
      // Remove trailing operator
      if (isOperator(expr[expr.length - 1])) {
        expr = expr.slice(0, -1);
      }
      // Evaluate
      let val = Function('return ' + expr)();
      if (typeof val === 'number' && isFinite(val)) {
        // Format with commas if integer, else show as is
        return Number.isInteger(val) ? val.toLocaleString() : val;
      }
      return 'Error';
    } catch {
      return 'Error';
    }
  }

  function handleButtonClick(e) {
    const btn = e.currentTarget;
    let value = btn.textContent.trim();
    // Map operator buttons with icons to their JS equivalents
    if (btn.classList.contains('operator')) {
      if (btn.querySelector('img')) {
        const alt = btn.querySelector('img').alt;
        if (alt === '/') value = '/';
        else if (alt === '*') value = '*';
      }
    }
    if (btn.classList.contains('number')) {
      expression += value;
      lastInput = value;
    } else if (btn.classList.contains('operator')) {
      // Prevent two operators in a row
      if (expression && !isOperator(expression[expression.length - 1])) {
        expression += value;
        lastInput = value;
      }
    } else if (btn.classList.contains('dot')) {
      // Prevent multiple dots in a number
      const parts = expression.split(/[-+*/]/);
      if (!parts[parts.length - 1].includes('.')) {
        expression += '.';
        lastInput = '.';
      }
    } else if (btn.classList.contains('ac')) {
      expression = '';
      result = '';
      lastInput = '';
    } else if (btn.classList.contains('delete')) {
      expression = expression.slice(0, -1);
      lastInput = '';
    } else if (btn.classList.contains('equal')) {
      if (expression) {
        result = safeEval(expression);
        lastInput = '=';
      }
    }
    // Only calculate on equal, so clear result on any input except equal
    if (!btn.classList.contains('equal')) {
      result = '';
    }
    if (btn.classList.contains('equal')) {
      // On equal, keep result until next input
      expression = result !== 'Error' ? '' : expression;
    }
    updateDisplay();
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', handleButtonClick);
  });

  updateDisplay();
});
