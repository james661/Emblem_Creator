const { Circle, Square, Triangle } = require("./lib/shapes");
const inquirer = require("inquirer");
const fs = require("fs");

class Svg {
  constructor() {
    this.textElement = "";
    this.shapeElement = "";
  }

  render() {
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${this.shapeElement}${this.textElement}
    </svg>`;
  }

  setText(text, color) {
    this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">
      ${text}
    </text>`;
  }

  setShape(shape) {
    this.shapeElement = shape.render();
  }
}

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Enjoy your new logo!");
    }
  });
}

async function init() {
  const questions = [
    {
      name: "text",
      type: "input",
      message: "What 3 characters would you like in your logo?",
    },
    {
      name: "textColor",
      type: "input",
      message: "Choose a font color by name or with a hexadecimal number",
    },
    {
      name: "logoShape",
      type: "list",
      message: "What shape would you like the logo to be?",
      choices: ["Circle", "Square", "Triangle"],
    },
    {
      name: "shapeColor",
      type: "input",
      message: "Choose a shape color by name or with a hexadecimal number",
    },
  ];

  const svg = new Svg();

  try {
    const answers = await inquirer.prompt(questions);
    const userText = answers.text;
    const userFontColor = answers.textColor;
    const userShapeColor = answers.shapeColor;
    const userShapeType = answers.logoShape;

    let userShape;

    switch (userShapeType) {
      case "Square":
        userShape = new Square();
        break;
      case "Circle":
        userShape = new Circle();
        break;
      case "Triangle":
        userShape = new Triangle();
        break;
      default:
        console.log("Please choose another shape");
        return;
    }

    userShape.setColor(userShapeColor);

    svg.setText(userText, userFontColor);
    svg.setShape(userShape);
    const svgString = svg.render();

    writeToFile("logo.svg", svgString);
  } catch (error) {
    console.error(error);
  }
}

init();
