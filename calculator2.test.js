// Unit tests for calculator2.js logic (Node.js)
// This file mocks the core calculation logic for isolated testing

function calculate(equation) {
  try {
    if (/^[0-9+\-*/.() ]+$/.test(equation)) {
      // eslint-disable-next-line no-eval
      let evalResult = eval(equation);
      if (typeof evalResult === 'number' && isFinite(evalResult)) {
        return evalResult;
      } else {
        return 'Error';
      }
    } else {
      return 'Error';
    }
  } catch {
    return 'Error';
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    console.error(`❌ ${message}: expected ${expected}, got ${actual}`);
  } else {
    console.log(`✅ ${message}`);
  }
}

// Tests
assertEqual(calculate('1+1'), 2, 'Addition');
assertEqual(calculate('2*3'), 6, 'Multiplication');
assertEqual(calculate('10/2'), 5, 'Division');
assertEqual(calculate('5-2'), 3, 'Subtraction');
assertEqual(calculate('2+3*4'), 14, 'Order of operations');
assertEqual(calculate('10/(2+3)'), 2, 'Parentheses');
assertEqual(calculate(''), 'Error', 'Empty input');
assertEqual(calculate('2+2a'), 'Error', 'Invalid input');
assertEqual(calculate('1/0'), 'Error', 'Division by zero');
