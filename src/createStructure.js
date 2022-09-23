export const addAlarmMessage = (text, element) => {
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

export const removeAlarmMessage = (element) => {
  element ? element.remove() : "";
};
