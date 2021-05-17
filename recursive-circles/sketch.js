//Michael Abbott
//Rurcursive cirles using p5js

let radius, radiusRatio, alts, colors;

function setup(){
    var canvas = createCanvas(600, 600);
    canvas.parent("draw");
    colorMode(HSB);
    noStroke();
    noLoop();
    
    //set variables
    colors = [];
    var hue = random(360);
    for(var i = 0; i < 8; i++){
        colors.push(color(hue + 10 * i, 20 + 20 * i, 100 - 8 *i ))
    }
    ratio = random(0.1, 0.9);
    radius = width / 2;
}

function draw(){
    background(255);
    drawCircle(width/2, height/2, radius, 0);
}

function drawCircle(x, y, radius, count){
    let getColor = colors[count % colors.length];
    fill(getColor);
    ellipse(x, y, 2 * radius)
    if(count < 38) {

        let newRadius = radius * ratio
        let remainder = radius * (1 - ratio);
        if(count % 2 == 1){
            drawCircle(x -  remainder, y, newRadius, count + 2);
            drawCircle(x + newRadius, y, remainder, count + 4)
        }
        else{
            drawCircle(x +  remainder, y, newRadius, count + 2);
            drawCircle(x - newRadius, y, remainder, count + 3)
        }
    }
}