//Michael Abbott
//Basic clock made with p5js


let secondsAngle;
let minutesAngle;
let hourAngle;

//clock ~class function that handles the time
function Clock(){
  let currentTime = new Date();
  var self = this;
  self.seconds = currentTime.getSeconds();
  self.minutes = currentTime.getMinutes();
  self.hour = currentTime.getHours();
  self.tick = function(){
    self.tock();
    setInterval(function(){
      self.tock();
      self.seconds += 1;
      if(self.seconds == 60){
        self.seconds = 0;
        self.minutes += 1;
      }
      if(self.minutes == 60){
        self.minutes = 0;
        self.hour += 1;
      }
      if(self.hour >= 12){
        self.hour = 1;
      }
      },1000)
  }

  //update the line angle based on the time
  self.tock = function(){
      secondsAngle = map(this.seconds, 0, 60, 0, 360);
      minutesAngle = map(this.minutes,0,60,0,360);
      hourAngle = map(this.hour, 0, 12, 0, 360);
  }
  
}

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent("draw");
  angleMode(DEGREES);
  let clock = new Clock();
  clock.tick();
}

function draw() {
  background(50);
  strokeWeight(0);
  
  //purple first circle
  fill(155, 89, 182);
  ellipse(width/2, height/2, width/2, height/2);
  
  //blue green second circle
  fill(69, 179, 157 );
  ellipse(width/2, height/2, width/2.2, height/2.2);
  
  //yellow third circle
  fill(245, 176, 65)
  ellipse(width/2, height/2, width/2.5, height/2.5);
  
  //pink base circle
  fill('#ed225d');
  ellipse(width/2, height/2, width/2.7, height/2.7);
  
  //green hand cirlce
  fill(25, 111, 61)
  ellipse(width/2, height/2, width/25, height/25);

  

  translate(300,300);
  rotate(-90);

  //seconds rotation
  push();
  rotate(secondsAngle);
  strokeWeight(4);
  stroke(255);
  line(0,0,55,0);
  pop();

  //minutes rotation
  push();
  rotate(minutesAngle);
  strokeWeight(5);
  stroke(41, 128, 185);
  line(0,0,70,0);
  pop();

  //hours rotation
  push();
  rotate(hourAngle);
  strokeWeight(6);
  stroke(75, 80, 87);
  line(0,0,85,0);
  pop();
  
}