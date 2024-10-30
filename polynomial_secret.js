const fs = require("fs");

function convertFromBase(value, base) {
  if (base <= 10) {
    return BigInt(parseInt(value, base));
  }

  const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  let result = BigInt(0);
  value = value.toLowerCase();

  for (let i = 0; i < value.length; i++) {
    const digit = BigInt(digits.indexOf(value[i]));
    result = result * BigInt(base) + digit;
  }

  return result;
}

function findConstantTerm(points) {
  const n = points.length;
  let result = BigInt(0);

  for (let i = 0; i < n; i++) {
    let term = BigInt(points[i].y);
    let numerator = BigInt(1);
    let denominator = BigInt(1);

    for (let j = 0; j < n; j++) {
      if (i !== j) {
        numerator = numerator * BigInt(-points[j].x);
        denominator = denominator * BigInt(points[i].x - points[j].x);
      }
    }

    if (denominator < BigInt(0)) {
      numerator = -numerator;
      denominator = -denominator;
    }

    term = (term * numerator) / denominator;
    result = result + term;
  }

  return result;
}

function processTestCase(testCase) {
  const {
    keys: { k },
    ...pointsData
  } = testCase;
  const points = [];

  Object.entries(pointsData).forEach(([x, data]) => {
    if (x !== "keys") {
      const xVal = parseInt(x);
      const yVal = convertFromBase(data.value, parseInt(data.base));
      points.push({ x: xVal, y: yVal });
    }
  });

  points.sort((a, b) => a.x - b.x);

  const selectedPoints = points.slice(0, k);

  const secret = findConstantTerm(selectedPoints);
  return secret;
}

function processAllTestCases() {
  const testCase1 = {
    keys: {
      n: 4,
      k: 3,
    },
    1: {
      base: "10",
      value: "4",
    },
    2: {
      base: "2",
      value: "111",
    },
    3: {
      base: "10",
      value: "12",
    },
    6: {
      base: "4",
      value: "213",
    },
  };

  // Test case 2
  const testCase2 = {
    keys: {
      n: 10,
      k: 7,
    },
    1: {
      base: "6",
      value: "13444211440455345511",
    },
    2: {
      base: "15",
      value: "aed7015a346d63",
    },
    3: {
      base: "15",
      value: "6aeeb69631c227c",
    },
    4: {
      base: "16",
      value: "e1b5e05623d881f",
    },
    5: {
      base: "8",
      value: "316034514573652620673",
    },
    6: {
      base: "3",
      value: "2122212201122002221120200210011020220200",
    },
    7: {
      base: "3",
      value: "20120221122211000100210021102001201112121",
    },
    8: {
      base: "6",
      value: "20220554335330240002224253",
    },
    9: {
      base: "12",
      value: "45153788322a1255483",
    },
    10: {
      base: "7",
      value: "1101613130313526312514143",
    },
  };

  try {
    const secret1 = processTestCase(testCase1);
    const secret2 = processTestCase(testCase2);

    console.log("Test Case 1:", secret1.toString());
    console.log(" Test Case 2:", secret2.toString());
  } catch (error) {
    console.error("An error occurred:", error);
  }
}


processAllTestCases();



//testcase outputs are
// Test Case 1: 3
// Test Case 2: 79836264058144
