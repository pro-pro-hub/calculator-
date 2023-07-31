// By Pro-Expert
(() => {
  [
    ...document.querySelectorAll(".gray"),
    ...document.querySelectorAll(".white"),
  ].forEach((button) => {
    button.addEventListener(
      "click",
      (evt) => {
        if (button.classList.contains("white")) {
          button.classList.add("clicked-white");
          setTimeout(() => {
            button.classList.remove("clicked-white");
          }, 300);
        } else {
          button.classList.add("clicked-gray");
          setTimeout(() => {
            button.classList.remove("clicked-gray");
          }, 300);
        }
      },
      true
    );
  });
})();

(() => {
  const removeClicked = document.querySelectorAll("button");
  const removeList = [];
  for (let i = 1; i < removeClicked.length; i++) {
    removeList.push(removeClicked[i]);
  }
  removeList.forEach((button) => {
    button.addEventListener("click", (evt) => {
      const specialButtons = document.querySelectorAll(".clicked-yellow");
      specialButtons.forEach((sButton) => {
        sButton.classList.remove("clicked-yellow");
        for (const span of sButton.children) {
          span.classList.remove("turn-yellow");
        }
      });
    });
  });
})();

(() => {
  document.querySelectorAll(".yellow").forEach((button) => {
    if (button.classList.contains("equals")) {
      button.addEventListener("click", (evt) => {
        button.classList.add("clicked-equals");
        setTimeout(() => {
          button.classList.remove("clicked-equals");
        }, 300);
      });
    } else {
      button.addEventListener("click", (evt) => {
        button.classList.add("clicked-yellow");
        for (const span of button.children) {
          span.classList.add("turn-yellow");
        }
      });
    }
  });
})();
