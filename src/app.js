const combineArrays = (arr1, arr2) => {
  let result = [];

  for (let i = 0; i < arr1.length; i++) {
    result.push(+arr1[i] + +arr2[i]);
  }

  return result;
};

const fillArrayResult = (inputs, element) => {
  let outerArr = [];
  let flag = true;
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (!input.textContent.length) {
      break;
    }
    let arr = input.textContent.split(",");

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

const calculationMethods = (arg1, arg2, char) => {
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

const addAlarmMessage = (text, element) => {
  if (document.querySelector(".alarmContainer")) {
    document.querySelector(".alarmContainer__message").textContent = text;
    return;
  }
  const container = document.createElement("div");
  const title = document.createElement("div");
  const messageBlock = document.createElement("div");

  container.classList.add("alarmContainer");
  title.classList.add("alarmContainer__title");
  messageBlock.classList.add("alarmContainer__message");

  title.textContent = "Ошибка";
  messageBlock.textContent = text;

  container.prepend(messageBlock);
  container.prepend(title);

  element.before(container);
};

const removeAlarmMessage = (element) => {
  element ? element.remove() : "";
};

const checkCurrentChar = (currentChar) => {
  if (
    currentChar === "+" ||
    currentChar === "-" ||
    currentChar === "*" ||
    currentChar === "/"
  ) {
    return true;
  } else {
    return false;
  }
};

class Calculator {
  _currentFlag = false;

  get currentFlag() {
    return this._currentFlag;
  }

  set currentFlag(value) {
    this._currentFlag = value;
  }

  get currentChar() {
    return this._currentChar;
  }

  set currentChar(value) {
    this._currentChar = value;
  }

  constructor() {
    const button = document.querySelector(".main_button");
    const areaResult = document.querySelector(".main__result");
    const select = document.querySelector(".main__select");
    const inputs = document.querySelectorAll(".main__container_inputArea");
    this.currentChar = document.querySelector(".main__select").value;

    select.addEventListener("change", (event) => {
      this.currentChar = event.target.value;

      if (event.target.value === "boolean deny") {
        for (let i = 1; i < inputs.length; i++) {
          let input = inputs[i];
          input.classList.add("hidden");
        }
      } else {
        for (let i = 1; i < inputs.length; i++) {
          let input = inputs[i];
          input.classList.remove("hidden");
        }
      }
      areaResult.textContent = "";
      removeAlarmMessage(document.querySelector(".alarmContainer"));
    });

    button.addEventListener("click", () => {
      areaResult.textContent = "";

      for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        if (input.textContent.length < 1) {
          addAlarmMessage("Введены не все данные", areaResult);
          return;
        }
        if (isNaN(input.textContent)) {
          this.currentFlag = false;
          break;
        } else {
          this.currentFlag = true;
        }
      }

      if (this.currentFlag && checkCurrentChar(this.currentChar)) {
        this.calculation(
          +inputs[0].textContent,
          +inputs[1].textContent,
          this.currentChar,
          areaResult
        );

        removeAlarmMessage(document.querySelector(".alarmContainer"));
      } else if (!this.currentFlag && checkCurrentChar(this.currentChar)) {
        addAlarmMessage(
          "Введены неверные данные, нужно ввести числа",
          areaResult
        );
      }

      if (select.value === "str plus str") {
        this.stringAddition(
          inputs[0].textContent,
          inputs[1].textContent,
          areaResult
        );
        removeAlarmMessage(document.querySelector(".alarmContainer"));
      }

      if (select.value === "boolean deny") {
        if (
          inputs[0].textContent === "true" ||
          inputs[0].textContent === "false"
        ) {
          this.booleanDeny(inputs[0].textContent, areaResult);
          removeAlarmMessage(document.querySelector(".alarmContainer"));
        } else {
          addAlarmMessage(
            "Введены неверные данные, нужно ввести логическое значение",
            areaResult
          );
        }
      }

      if (select.value === "addion Array char by char") {
        this.additionOfArraysCharByChar(inputs, areaResult);
      }

      inputs.forEach((input) => {
        input.textContent = "";
      });
    });
  }

  calculation(arg1, arg2, char, element) {
    element.textContent = calculationMethods(arg1, arg2, char);
  }

  stringAddition(arg1, arg2, element) {
    let sum = arg1 + arg2;

    element.textContent = sum;
  }

  booleanDeny(arg, element) {
    let newArg;

    if (arg === "true") {
      newArg = true;
    } else {
      newArg = false;
    }

    element.textContent = !newArg;
  }

  additionOfArraysCharByChar(inputs, element) {
    fillArrayResult(inputs, element);
  }
}

let App = new Calculator();
