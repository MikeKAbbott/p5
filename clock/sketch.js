let secondsAngle;
let minutesAngle;
let hourAngle;

function clock(){
  var self = this;
  self.seconds = 0;
  self.minutes = 0;
  self.hour = 0;
  self.tick = function(){
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
  
  self.tock = function(){
      secondsAngle = map(this.seconds, 0, 60, 0, 360);
      minutesAngle = map(this.minutes,0,60,0,360);
      hourAngle = map(this.hour, 0, 12, 0, 360);
  }
  
}

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  let time = new clock();
  time.tick();
}

function draw() {
  background(50);
  strokeWeight(0);
  fill(155, 89, 182);
  ellipse(width/2, height/2, width/2, height/2);
  
  fill(69, 179, 157 );
  ellipse(width/2, height/2, width/2.2, height/2.2);
  
  fill(245, 176, 65)
  ellipse(width/2, height/2, width/2.5, height/2.5);
  
  
  fill(25, 111, 61)
  ellipse(width/2, height/2, width/25, height/25);
  
  //seconds hand
  strokeWeight(4);
  stroke(231, 76, 60);
  line(0,0,50,0);

  //minutes hand
  strokeWeight(5);
  stroke(41, 128, 185);
  line(0,0,60,0);

  //hour hand
  strokeWeight(6);
  stroke(75, 80, 87);
  line(0,0,75,0);
  
  //seconds rotation
  push();
  translate(200,200);
  rotate(-90);
  rotate(secondsAngle);
  strokeWeight(4);
  stroke(231, 76, 60);
  line(0,0,50,0);
  pop();

  //minutes rotation
  push();
  translate(200,200);
  rotate(-90);
  rotate(minutesAngle);
  strokeWeight(5);
  stroke(41, 128, 185);
  line(0,0,60,0);
  pop();

  //minutes rotation
  push();
  translate(200,200);
  rotate(-90);
  rotate(hourAngle);
  strokeWeight(6);
  stroke(75, 80, 87);
  line(0,0,75,0);
  pop();
  
}