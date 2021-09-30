function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    let grassCountElement = document.querySelector('#grassCount');
    let grassEaterCountElement = document.querySelector('#grassEaterCount');


    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.herbCounter;

        createCanvas(matrix[0].length * side, matrix.length * side)
        background('#acacac');

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("yellow");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill("red");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill("grey");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill("#F1C27D");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill("#8D5524");
                    rect(j * side, i * side, side, side);
                } 
            }
        }
    }
}