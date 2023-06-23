// Importing all necessary modules and the shape classes.
const { Circle, Square, Triangle } = require("./lib/shapes");
const inquirer = require("inquirer");
const fs = require("fs");

//
class Svg {
  constructor() {
    this.textElement = "";
    this.shapeElement = "";
  }
  // Renders the SVG with the chosen shape and text. Xmlns provides rendering on simple browsers.
  render() {
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${this.shapeElement}${this.textElement}</svg>`;
  }

  setText(text, color) {
    this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }

  setShape(shape) {
    this.shapeElement = shape.render();
  }
}
// Function to write data to file.
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Enjoy your new logo!");
    }
  });
}
// Function to initialize in Node.
async function init() {
  // Asks the user 4 questions and collects their answers.
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
  // Create a new SVG constructor so we can add text and shape elements.
  const svg = new Svg();
  // Puts the user's answers in variables to be used later.
  try {
    const answers = await inquirer.prompt(questions);
    const userText = answers.text;
    const userFontColor = answers.textColor;
    const userShapeColor = answers.shapeColor;
    const userShapeType = answers.logoShape;

    let userShape;
    // Switch case for each shape choice possible. Creates a new shape constructor.
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
    }

    userShape.setColor(userShapeColor);
    // Adds the text and shape elements to the new SVG instance.
    svg.setText(userText, userFontColor);
    svg.setShape(userShape);
    const svgString = svg.render();

    writeToFile("logo.svg", svgString);
  } catch (error) {
    console.error(error);
  }
}

// Call the initializing function
init();
