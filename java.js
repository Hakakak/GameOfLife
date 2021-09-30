var side =  10;
var grassArr = [];
var herbArr = [];
var predArr = [];
var starter = [];
var stormArr = [];
var humanArr = [];
var matrix = [];
var start = new allStarter();
starter.push(start);

function generateMatrix(side, GrassCount, GrassEaterCount, PredatorCount){
    
    for (let i = 0; i < side; i++) {   
        let arr = [];  
        matrix.push(arr);
        for (let j = 0; j < side; j++) {   
            matrix[i].push(0);
        }     
    }

    for (let i = 0; i < GrassCount; i++) {
        let x = Math.round(random(0, side - 1));
        let y = Math.round(random(0, side - 1));
        if (matrix[y][x] == 0) {
            let gr = new Grass(x,y);
            grassArr.push(gr);
            matrix[y][x] = 1;
        }
    }
    for (let i = 0; i < GrassEaterCount; i++) {
        let x = Math.round(random(0, side - 1));
        let y = Math.round(random(0, side - 1));
        if (matrix[y][x] == 0) {
            let Xt = new Herbivore(x,y);
            herbArr.push(Xt);
            matrix[y][x] = 2;
        }
    }
    for (let i = 0; i < PredatorCount; i++) {
        let x = Math.round(random(0, side - 1));
        let y = Math.round(random(0, side - 1));
        if (matrix[y][x] == 0) {
            let Xt = new Predator(x,y);
            predArr.push(Xt);
            matrix[y][x] = 3;
        }
    }
}
     
function setup() {
    generateMatrix(60,300,30,0);
    createCanvas(side * matrix[0].length+1,side * matrix.length+1);
    frameRate(8);
    background("#acacac");
}
function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("grey");
            } else if (matrix[y][x] == 5) {
                fill("#F1C27D");
            } else if (matrix[y][x] == 0) {
                fill("#8D5524");
            } 
            
            rect(side*x,side*y,side,side);
            // fill(0,0,0);
            // text(x+""+(y-1), side*x,side*y);
        }
    }
    for (let i in grassArr){
        grassArr[i].mul();
    }
    for (let i in herbArr){
        herbArr[i].move();
    }
    for (let i in starter){
        starter[i].starterr();
    }
    for (let i in stormArr){
        stormArr[i].mind();
    }
    for (let i in predArr){
        predArr[i].move();
    }
    for (let i in humanArr){
        humanArr[i].move();
    }
}