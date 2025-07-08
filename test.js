// Basic unit tests for calculator logic (safeEval)
// Run with Node.js or browser console

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    console.error(`❌ ${message}: expected '${expected}', got '${actual}'`);
  } else {
    console.log(`✅ ${message}`);
  }
}

// Copy of safeEval for testing (since it's not exported)
function safeEval(expr) {
  function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
  }
  try {
    expr = expr.replace(/×/g, '*').replace(/÷/g, '/');
    if (isOperator(expr[expr.length - 1])) {
      expr = expr.slice(0, -1);
    }
    let val = Function('return ' + expr)();
    if (typeof val === 'number' && isFinite(val)) {
      return Number.isInteger(val) ? val.toLocaleString() : val;
    }
    return 'Error';
  } catch {
    return 'Error';
  }
}

// Test cases
assertEqual(safeEval('2+2'), '4', 'Simple addition');
assertEqual(safeEval('2*3'), '6', 'Multiplication');
assertEqual(safeEval('8/2'), '4', 'Division');
assertEqual(safeEval('5-3'), '2', 'Subtraction');
assertEqual(safeEval('2+2*2'), '6', 'Order of operations');
assertEqual(safeEval('10/3'), 10/3, 'Float division');
assertEqual(safeEval('1.5+2.5'), '4', 'Decimal addition');
assertEqual(safeEval('1+'), '1', 'Trailing operator');
assertEqual(safeEval(''), 'Error', 'Empty input');
assertEqual(safeEval('2++2'), 'Error', 'Invalid input');
assertEqual(safeEval('1000*1000'), '1,000,000', 'Large number formatting');
assertEqual(safeEval('2×3'), '6', 'Unicode multiplication');
assertEqual(safeEval('8÷2'), '4', 'Unicode division');
