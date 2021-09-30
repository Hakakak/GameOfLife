const Grass = require("./modules/Grass");
const Herbivore = require("./modules/Herbivore");
const Predator = require("./modules/Predator");
const Storm = require("./modules/Storm");
const Human = require("./modules/Human");
const AllStarter = require("./modules/AllStarter");
const random = require("./modules/random");


matrix = [];
side = 50;
grassHashiv = 0;
herbCounter = 0;
grassArr = [];
herbArr = []; 
predArr = [];
starter = [];
stormArr = [];
humanArr = [];
starter = [new AllStarter()];



//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, grassEaterEater) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < grassEaterEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
}
matrixGenerator(side, 20, 10);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
const express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('main.html');
});
server.listen(3000, () => {
    console.log("Server is running just fine");
});
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var herb = new Herbivore(x, y);
                herbArr.push(herb);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            } else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y);
                predArr.push(pred);
            }
        }
    }
}
creatingObjects();

function deleteScreen() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    grassArr = [];
    herbArr = []; 
    predArr = [];
    starter = [];
    stormArr = [];
    humanArr = [];
}

setInterval(() => {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (herbArr[0] !== undefined) {
        for (var i in herbArr) {
            herbArr[i].move();
        }
    }
    if (predArr[0] !== undefined) {
        for (var i in predArr) {
            predArr[i].move();
        }
    }
    if (stormArr[0] !== undefined) {
        for (var i in stormArr) {
            stormArr[i].mind();
        }
    }
    if (humanArr[0] !== undefined) {
        for (var i in humanArr) {
            humanArr[i].move();
        }
    }
    if (starter[0] !== undefined) {
        for (var i in starter) {
            starter[i].starterr();
        }
    }   

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        herbCounter: herbArr.length
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}, 250);