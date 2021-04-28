function Branch(begin, end) {
    this.begin = begin;
    this.end = end;
    this.finished = false;
    
    

    this.show = function (weight) {
        stroke(51);
        strokeWeight(weight);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    };

    this.branchRight = function () {
        var dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(PI / 6);
        dir.mult(0.67);
        var newEnd = p5.Vector.add(this.end, dir);
        var b = new Branch(this.end, newEnd);
        return b;
    };
    this.branchLeft = function () {
        var dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(-PI / 4);
        dir.mult(0.67);
        var newEnd = p5.Vector.add(this.end, dir);
        var b = new Branch(this.end, newEnd);
        return b;
    };
}


var tree = [];
var summerTree = [];
var leaves = [];
var count = 0;
function setup() {
    createCanvas(displayWidth, displayHeight);
    var a = createVector(width / 2, height - 300);
    var b = createVector(width / 2, height - 500);
    var root = new Branch(a, b);
    tree[0] = root;
    fractal();
}

function draw() {
    background(255);
    weight = 12;
    for (var i = 0; i < tree.length; i++) {
        weight = weight > 1.5 ? (weight - 0.5) : weight;
        tree[i].show(weight);
    }
    for (var i = 0; i < leaves.length; i++) {
        fill(240, 30, 113);
        noStroke();
        ellipse(leaves[i].x, leaves[i].y, 12, 6);
    }
    setTimeout(function(){
        for (var i = 0; i < leaves.length; i++) {
            if (leaves[i].y < height - 300){
                leaves[i].y += random(0, 6);
                leaves[i].x += random(2,8);
            }
        }
        
    },3000)
    
}

function fractal() {
    var instance = setInterval(function () {
        for (var i = tree.length - 1; i >= 0; i--) {
            if (!tree[i].finished) {
                tree.push(tree[i].branchRight());
                tree.push(tree[i].branchLeft());
            }
            tree[i].finished = true;
        }
        count++;
        if (count >= 8) {
            for (var i = 0; i < tree.length; i++) {
                if (!tree[i].finished) {
                    var leaf = tree[i].end.copy();
                    leaves.push(leaf);
                }
            }
        }
        if (count === 12) {
            clearInterval(instance);
        }
    }, 250);
}