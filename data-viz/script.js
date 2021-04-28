
var vals;
let i = 1;
let j = 0;
var a;


let listener = document.getElementsByName('algorithm');
listener.forEach(function(e){
    e.onclick = function(){
        resetCanvas();
        a = algs[this.value]();
    }
})


function Value(){
    this.height = random(height);
    this.color = color(0,random(250),random(250));
}

function resetCanvas(){
    i = 1;
    j = 0;
    vals = new Array(width);
    for (let i = 0; i < vals.length; i++) {
        vals[i] = new Value();
    }
}



function setup() {
    width *= 4;
    height *= 4;
    createCanvas(width, height);
    resetCanvas();

}
function draw() {
    background(255);
    insertionSort();
}


const insertionSort = () => {
    //let i = 1;
    if (i < vals.length){
        let key = vals[i];
        j = i - 1;
        while(j >= 0 && key.height < vals[j].height){
            stroke(vals[j].color);
            line(j, height, j, height - vals[j].height);
            vals[j + 1] = vals[j];
            j -= 1;
        }
        vals[j + 1] = key;

    }
    i += 1;
    for (let i = 0; i < vals.length; i++) {
        stroke(0);
        line(i, height, i, height - vals[i].height);
    }
}

const bubbleSort = () => {
    if (i < vals.length) {
        for (let j = 0; j < vals.length - i - 1; j++) {
            stroke(vals[j].color);
            line(j, height, j, height - vals[j].height);
            if (vals[j].height > vals[j + 1].height) {
                let temp = vals[j];
                vals[j] = vals[j + 1];
                vals[j + 1] = temp;
            }
        }
    }
    i += 1;
    // for (let i = 0; i < vals.length; i++) {
    //     stroke(0);
    //     line(i, height, i, height - vals[i].height);
    // }
}
const swap = (arr, a, b) => {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

algs = {
    'insertionsort':insertionSort,
    'bubblesort':bubbleSort
}