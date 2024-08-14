const fs = require("fs");
const { Circle, Square, Triangle } = require("./lib/shapes");
const inquirer = require("inquirer");

function createSVG({ text, textColor, shape, shapeColor }) {
  let shapeElement;

  switch (shape) {
    case "circle":
      shapeElement = new Circle(shapeColor).render();
      break;
    case "square":
      shapeElement = new Square(shapeColor).render();
      break;
    case "triangle":
      shapeElement = new Triangle(shapeColor).render();
      break;
  }

  const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shapeElement}
      <text x="150" y="125" font-size="40" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>
  `;

  return svgContent.trim();
}

function init() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "text",
        message: "Enter text for logo",
      },
      {
        type: "input",
        name: "textColor",
        message: "Text color?",
      },
      {
        type: "list",
        name: "shape",
        message: "Choose your shape",
        choices: ["square", "triangle", "circle"],
      },
      {
        type: "input",
        name: "shapeColor",
        message: "Choose shape color",
      },
    ])
    .then((answers) => {
      const svgContent = createSVG(answers);
      fs.writeFileSync("logo.svg", svgContent);
      console.log("Generated logo.svg file");
    })
    .catch((error) => {
      console.log(error);
    });
}

init();
