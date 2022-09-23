import { fillArrayResult, calculationMethods } from "./utils";
import { addAlarmMessage, removeAlarmMessage } from "./createStructure";

export default class Calculator {
  _currentFlag = false;
  _currentChar = document.querySelector(".main__select").value;

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

    select.addEventListener("change", (event) => {
      this.currentChar = event.target.value;

      if (event.target.value === "boolean deny") {
        for (let i = 1; i < inputs.length; i++) {
          inputs[i].classList.add("hidden");
        }
      } else {
        for (let i = 1; i < inputs.length; i++) {
          inputs[i].classList.remove("hidden");
        }
      }
      areaResult.textContent = "";
      removeAlarmMessage(document.querySelector(".alarmContainer"));
    });

    button.addEventListener("click", () => {
      areaResult.textContent = "";

      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].textContent.length < 1) {
          addAlarmMessage("Введены не все данные", areaResult);
          return;
        }
        if (isNaN(inputs[i].textContent)) {
          this.currentFlag = false;
          break;
        } else {
          this.currentFlag = true;
        }
      }

      if (
        this.currentFlag &&
        (this.currentChar === "+" ||
          this.currentChar === "-" ||
          this.currentChar === "*" ||
          this.currentChar === "/")
      ) {
        this.calculation(
          +inputs[0].textContent,
          +inputs[1].textContent,
          this.currentChar,
          areaResult
        );

        removeAlarmMessage(document.querySelector(".alarmContainer"));
      } else if (
        !this.currentFlag &&
        (this.currentChar === "+" ||
          this.currentChar === "-" ||
          this.currentChar === "*" ||
          this.currentChar === "/")
      ) {
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
