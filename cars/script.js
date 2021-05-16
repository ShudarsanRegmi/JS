let container = document.getElementById("container");
let carArray = [];
let carIndex = 0;
// Class for creating car objects
class Car {
  constructor(name,color,speed,image) {
    // Properties
    this.name = name;
    this.color = color;
    this.speed = speed;
    this.image = image;
  }

  addMoveOnCar(obj) {
    console.clear();
    obj.dom.addEventListener("keydown",event=>{
      triggerCarMove(obj,event,obj.speed);
    })
  }
  makeCar() {
    console.log(this)
    carArray[carIndex] = document.createElement("div");
    carArray[carIndex].classList.add("car");
    carArray[carIndex].style.backgroundImage = `url('${this.image}')`;
    carArray[carIndex].tabIndex = carIndex+1;
    let carName = document.createElement("span");
    carName.innerText = this.name;
    carName.classList.add("carName");
    carArray[carIndex].appendChild(carName);
    container.appendChild(carArray[carIndex]);
    this.dom = carArray[carIndex];
    this.addMoveOnCar(this);
    carIndex++;
  }
  // Function that moves car in x axis
  moveX(xpx) {
    let initialPosition = window.getComputedStyle(this.dom,null).getPropertyValue("left");
    // console.log("Initial position = " + initialPosition);
    // console.log(parseInt("Initial Position = " +initialPosition));
    let newPosition = parseInt(initialPosition) + xpx;
    // console.log("New Position = " + newPosition);
    this.dom.style.left = newPosition+"px";
    this.dom.style.transform = "rotate(90deg)";
  }
  // Function that moves car in negative X axis
  moveXin(xpx) {
    let initialPosition = window.getComputedStyle(this.dom,null).getPropertyValue("left");
    // console.log("Initial Position = " + initialPosition);
    let newPosition = parseInt(initialPosition) - xpx;
    // console.log("New Position = "+newPosition);
    this.dom.style.left = newPosition+"px";
    this.dom.style.transform = "rotate(-90deg)";
  }
  // Function that moves car in Y axis
  moveY(xpx) {
    let initialPosition = window.getComputedStyle(this.dom,null).getPropertyValue("top");
    // initialPosition = Math.abs(parseInt(initialPosition));
    // console.log("Initial Position = " + initialPosition);
    let newPosition = parseInt(initialPosition) - xpx;
    // console.log("New Position = " + newPosition);
    this.dom.style.top = newPosition+"px";
    this.dom.style.transform = "rotate(0deg)";
  }
  // Function to move car in negative Y axis
  moveYin(xpx) {
    let initialPosition = window.getComputedStyle(this.dom,null).getPropertyValue("top");
    // initialPosition = Math.abs(parseInt(initialPosition));
    // console.log("Initial Position = " + initialPosition);
    let newPosition = parseInt(initialPosition) + xpx;
    // console.log("New Position = " + newPosition);
    this.dom.style.top = newPosition+"px";
    this.dom.style.transform = "rotate(180deg)";
  }

}
let car1 = new Car("ford","red",10,"./images/ford.jpeg");
car1.makeCar();
let car2 = new Car("tata","blue",20,"./images/tata.png");
car2.makeCar();
let car3 = new Car("fiesta","yellow",30,"./images/feasta.jpeg");
car3.makeCar();
let car4 = new Car("uber","green",40,"./images/uber.jpeg");
car4.makeCar();
let car5 = new Car("lamborghini","brown",70,"./images/lamborghini.jpeg");
car5.makeCar();

function triggerCarMove(item,event,speed) {
  // console.log(item)
  switch(event.code) {
    case "ArrowUp":
    // What to do on up arrow press
    item.moveY(speed);
    break;
    case "ArrowDown":
    // What to do on down arrow press
    item.moveYin(speed);
    break;
    case "ArrowLeft":
    // What do to don left arrow press
    item.moveXin(speed);
    break;
    case "ArrowRight":
    // what to do on right arrow press
    item.moveX(speed);
    break;
  }
}
