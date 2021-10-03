const Grass = require("./modules/Grass");
const Herbivore = require("./modules/Herbivore");
const Predator = require("./modules/Predator");
const AllStarter = require("./modules/AllStarter");
const EntityCount = require("./modules/EntityCount");
const SeasonManager = require("./modules/SeasonManager");
const random = require("./modules/random");


matrix = [];
MatrixSide = 50;
grassArr = [];
herbArr = []; 
predArr = [];
starter = [];
stormArr = [];
humanArr = [];
starter = [new AllStarter()];
seasons = {
    Winter: "Winter",
    Spring: "Spring",
    Summer: "Summer",
    Autumn: "Autumn"
}
entitycount = new EntityCount();
seasonManager = new SeasonManager();


function matrixGenerator(matrixSize, grass, grassEater, grassEaterEater) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
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
matrixGenerator(MatrixSide, 20, 10, 5);



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

setInterval(() => {
    if (grassArr[0] !== undefined) for (const i in grassArr) { grassArr[i].mul()};
    if (herbArr[0] !== undefined) for (const i in herbArr) { herbArr[i].move()};
    if (predArr[0] !== undefined) for (const i in predArr) { predArr[i].move()};
    if (stormArr[0] !== undefined) for (const i in stormArr) { stormArr[i].mind()};
    if (humanArr[0] !== undefined) for (const i in humanArr) { humanArr[i].move()};
    if (starter[0] !== undefined) for (const i in starter) { starter[i].starterr()};   

    entitycount.count.grassCount = grassArr.length;
    entitycount.count.herbivoreCount = herbArr.length;
    entitycount.count.predatorCount = predArr.length;
    entitycount.count.stormCount = stormArr.length;
    entitycount.count.humanCount = humanArr.length;

    let sendData = {
        matrix: matrix,
    }

    io.sockets.emit("data", sendData);
}, 1000);

function changeSeason(seasonId) {
    const seasonIds = Object.keys(seasons);
    seasonIds.forEach(season => {
        if(season == seasonId){
            io.sockets.emit("season", seasonManager.giveSeasonColor(season));
        }
    });
}

io.on("connection", (socket) => {
    socket.on("changeSeason", changeSeason)
    socket.on("changeChart", setupChart)
    socket.on("restart", restart)
})

function restart() {

    grassArr = [];
    herbArr = [];
    predArr = [];
    stormArr = [];
    humanArr = [];

    entitycount = new EntityCount();
    seasonManager = new SeasonManager();

    matrixGenerator(MatrixSide, 20, 10, 5);
    creatingObjects();

    console.log(Object.keys(entitycount.count));

    io.sockets.emit("data", {matrix: matrix})
}

function setupChart(){
    const string = Object.keys(entitycount.count).join(" ") + " ";
    const labels = string.split("Count ");
    labels.pop();
    for (const i in labels) {
        const str = labels[i];
        const str2 = str.charAt(0).toUpperCase() + str.slice(1);
        labels[i] = str2;
    }
    const data = {
        labels: labels,
        //labels: ["Grass", "Herbivore", "Predator"],
        datasets: [{
            label: 'Entity count',
            data: [
                   entitycount.count.grassCount,
                   entitycount.count.herbivoreCount,
                   entitycount.count.predatorCount,
                   entitycount.count.stormCount,
                   entitycount.count.humanCount,
                  ],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(255, 99, 132)',
                'rgb(201, 203, 207)',
                'rgb(255, 159, 64)',
            ],
            borderWidth: 0,
            hoverOffset: 4,
          }]
    }
    const config = {
        type:"bar",
        data: data,
        options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                font: {
                                    size: 30
                                }
                            }
                        },
                        x: {
                            ticks: {
                                font: {
                                    size: 20
                                }
                            }
                        },
                    },
                    responsive: false,
                },
        plugins: [{
            id: 'custom_canvas_background_color',
                beforeDraw: (chart) => {
                    const ctx = chart.canvas.getContext('2d');
                    ctx.save();
                    ctx.globalCompositeOperation = 'destination-over';
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                }
            }],
    }

    io.sockets.emit("chart", {config: config, data: data});
    
}
