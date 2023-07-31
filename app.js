// By Pro-Expert
class Calculator {
  constructor() {
    this.first = "";
    this.sequence = "";
    this.clearBtn = document.querySelector("#clear");
    this.screen = document.querySelector("#output");
    this.equals = document.querySelector("#equals");
    this.negative = document.querySelector("#negative");
    this.percent = document.querySelector("#percentage");
    this.numbers = document.querySelectorAll(".num");
    this.operators = document.querySelectorAll(".operator");
  }

  formatNumber = (num) => {
    const parts = num.split(".");
    const all =
      parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      (parts[1] ? "." + parts[1] : "");
    const checker =
      this.sequence.charAt(this.sequence.length - 1) === "."
        ? all + this.sequence.charAt(this.sequence.length - 1)
        : all;
    const showNumber =
      !this.sequence && num === "0"
        ? "0"
        : checker == "-"
        ? checker + 0
        : checker;
    return showNumber;
  };
  display = (text) => {
    if (!this.sequence && text == "0") {
      this.screen.textContent = "0";
    } else if (text.includes("e-")) {
      this.screen.textContent = text;
      this.size(this.screen.textContent.length);
    } else {
      const formattedNumber = this.formatNumber(text);
      this.screen.textContent = formattedNumber;
      this.size(this.screen.textContent.length);
    }
  };
  pushSequence = (seq) => {
    if (this.sequence.includes(".") && seq === ".") {
      this.sequence += "";
    } else if (!this.sequence.length && seq === "0") {
      this.sequence += "";
    } else if (this.sequence === "-" && seq === "0") {
      this.sequence += "";
    } else if (this.sequence.length === 9 && seq === ".") {
      this.sequence += "";
    } else if (
      this.sequence.length > 9 &&
      this.sequence.charAt(0) === "-" &&
      seq === "."
    ) {
      this.sequence += "";
    } else {
      if (!this.sequence.length && seq === ".") {
        this.sequence += "0" + seq;
      } else if (this.sequence === "-" && seq === ".") {
        this.sequence += "0" + seq;
      } else {
        this.sequence += seq;
      }
      this.clearBtn.textContent = "C";
      this.sequence = this.setLength(this.sequence);
      this.display(this.sequence);
    }
  };
  clear = () => {
    this.sequence = "";
    this.first = "";
    this.removeSpecial();
    this.removeClassList();
    this.clearBtn.textContent = "AC";
    this.display("0");
  };
  negativeNumber = () => {
    if (!this.sequence.includes("-")) {
      this.sequence = "-" + this.sequence;
      this.display(this.sequence);
    } else {
      this.sequence = this.sequence.replace(/-/g, "");
      this.display(this.sequence);
    }
  };
  percentage = () => {
    const num =
      this.screen.textContent === "-0"
        ? 0
        : Number(this.parse(this.screen.textContent));
    this.sequence = "";
    const process = (num / 100).toString();
    const percentVal = this.makeExpo(this.setLength(process));
    this.display(percentVal);
  };
  parse = (num) => {
    return num.replace(/,/g, "").replace(/\.$/, "");
  };
  setLength = (text) => {
    return text.includes("-") && text.includes(".")
      ? text.slice(0, 11)
      : text.includes("-") || text.includes(".")
      ? text.slice(0, 10)
      : text.slice(0, 9);
  };
  makeExpo = (num) => {
    return /(\.\d{7,})/.test(num) ? Number(num).toExponential(5) : num;
  };
  operation = (op) => {
    this.first =
      this.screen.textContent === "-0"
        ? "0" + op
        : this.parse(this.screen.textContent) + op;
    this.sequence = "";
  };
  equalsTo = () => {
    const ans = !this.first
      ? this.parse(this.screen.textContent)
      : eval(this.first + this.parse(this.screen.textContent));
    const process = this.makeExpo(this.setLength(ans.toString()));
    this.sequence = "";
    this.display(process);
  };
  removeClassList = () => {
    this.screen.classList.remove(
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "huge"
    );
  };
  size = (len) => {
    this.removeClassList();
    const fit =
      len === 7
        ? "seven"
        : len === 8
        ? "eight"
        : len === 9
        ? "nine"
        : len === 10
        ? "ten"
        : len === 11
        ? "eleven"
        : len === 12
        ? "twelve"
        : len > 12
        ? "huge"
        : "text";
    this.screen.classList.add(fit);
  };
  removeSpecial = () => {
    console.log(this.clearBtn.textContent);
    const specialButtons = document.querySelectorAll(".clicked-yellow");
    if (this.clearBtn.textContent === "AC") {
      specialButtons.forEach((sButton) => {
        sButton.classList.remove("clicked-yellow");
        for (const span of sButton.children) {
          span.classList.remove("turn-yellow");
        }
      });
    }
  };
}

(() => {
  const calculator = new Calculator();
  calculator.numbers.forEach((number) => {
    number.addEventListener("click", (evt) => {
      calculator.pushSequence(number.getAttribute("data-num"));
    });
  });
  calculator.clearBtn.addEventListener("click", (evt) => {
    calculator.clear();
  });
  calculator.negative.addEventListener("click", (evt) => {
    calculator.negativeNumber();
  });
  calculator.percent.addEventListener("click", (evt) => {
    calculator.percentage();
  });
  for (const operator of calculator.operators) {
    operator.addEventListener("click", (evt) => {
      calculator.operation(operator.getAttribute("data-op"));
    });
  }
  calculator.equals.addEventListener("click", (evt) => {
    calculator.equalsTo();
  });
})();
