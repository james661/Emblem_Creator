// Constructor classes made for each shape.
class Shape {

  constructor() {
    this.color = "";
  }
  setColor(color) {
    this.color = color;
  }
}
// Formats each shape class when one is chosen and fills with the chosen color.
class Circle extends Shape {
  render() {
    return `<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${this.color}"/>`;
  }
}

class Square extends Shape {
  render() {
    return `<rect x="50" height="200" width="200" fill="${this.color}"/>`;
  }
}

class Triangle extends Shape {
  render() {
    return `<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${this.color}"/>`;
  }
}

// Exports the shapes for use in other files.
module.exports = { Circle, Square, Triangle };
