import { addAlarmMessage, removeAlarmMessage } from "./createStructure";

const combineArrays = (arr1, arr2) => {
  let result = [];

  for (let i = 0; i < arr1.length; i++) {
    result.push(+arr1[i] + +arr2[i]);
  }

  return result;
};

export const fillArrayResult = (inputs, element) => {
  let outerArr = [];
  let flag = true;
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].textContent.length) {
      break;
    }
    let arr = inputs[i].textContent.split(",");

    outerArr.push(arr);
  }

  for (let i = 0; i < outerArr.length; i++) {
    for (let j = 0; j < outerArr[i].length; j++) {
      if (isNaN(outerArr[i][j])) {
        inputs.forEach((input) => {
          input.textContent = "";
        });
        addAlarmMessage(
          "Введены неверные данные, нужно ввести массив чисел",
          element
        );
        flag = false;
        break;
      }
    }
  }
  if (flag) {
    element.textContent = combineArrays(outerArr[0], outerArr[1]);
    removeAlarmMessage(document.querySelector(".alarmContainer"));
  }
};

export const calculationMethods = (arg1, arg2, char) => {
  let result;

  switch (char) {
    case "+": {
      result = arg1 + arg2;
      break;
    }
    case "-": {
      result = arg1 - arg2;
      break;
    }
    case "*": {
      result = arg1 * arg2;
      break;
    }
    case "/": {
      result = (arg1 / arg2).toFixed(2);
      break;
    }
  }

  return result;
};
