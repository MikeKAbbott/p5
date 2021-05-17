
function setup() {
    const canvas = createCanvas(600, 600);
    canvas.parent("draw");
    textSize(32);
    walker = new walk(width / 2, height / 2);
    background(255);

}
function draw() {
    walker.update();
    walker.show();

}

class walk{
    constructor(x, y){
        this.pos = createVector(x, y);
        this.color = color(random(0,150), random(0,150), random(0,150));
        this.maxVal = createSlider(1, 10, 6, 1);
        this.maxVal.position(0,20);
        this.minVal = createSlider(-10, -1, -6, 1);
        this.minVal.position(0, 20);
        this.count = 0;
         
        let maxGroup = createDiv('');
        maxGroup.position(50, 30);  
        this.maxVal.parent(maxGroup);
        let maxLabel = createSpan('max steps');
        maxLabel.parent(maxGroup);

        let minGroup = createDiv('');
        minGroup.position(50, 100);  
        this.minVal.parent(minGroup);
        let minLabel = createSpan('min steps');
        minLabel.parent(minGroup);
        
    }
    update(){
        if(this.count > 200){
            this.newColor();
            this.count = 0;
        }
        this.pos.x += random(this.minVal.value(), this.maxVal.value()) < width ? random(this.minVal.value(), this.maxVal.value()) : -random(this.minVal.value(), this.maxVal.value());
        this.pos.y += random(this.minVal.value(), this.maxVal.value()) < height ? random(this.minVal.value(), this.maxVal.value()) : -random(this.minVal.value(), this.maxVal.value()) ;
        this.count += 1;
    }
    newColor(){
        this.color = color(random(255), random(255), random(255));

    }
    show(){
        stroke(this.color);
        strokeWeight(2);
        circle(this.pos.x, this.pos.y, 20);
    }
}
