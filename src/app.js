import Calculator from "./calculator";
import "./styles.scss";

let App = new Calculator();

if (module.hot) {
  module.hot.accept();
}
