const Grass = require("./Modules/Grass");
const Herbivore = require("./Modules/Herbivore");
const Predator = require("./Modules/Predator");
const AllStarter = require("./Modules/AllStarter");
const EntityCount = require("./Modules/EntityCount");
const SeasonManager = require("./Modules/SeasonManager");
const MatrixCreator = require("./Modules/MatrixCreator");
const GameManager = require("./Modules/GameManager");

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
const fs = require("fs");

matrix = [];
MatrixSide = 50;
gamefps = 100;
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
gameManager = new GameManager();
onCooldown = false;

io.on("connection", (socket) => {
    socket.on("changeSeason", changeSeason);
    socket.on("killEntity", killEntity);
    socket.on("spawnEntity", spawnEntity);
    socket.on("changeChart", setupChart);
    socket.on("restart", restart);
    socket.on("fpsChange", (fps) => {gamefps = fps});
})

MatrixCreator(MatrixSide, 20, 10, 5, true);

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

function RunGame() {
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
    
    io.sockets.emit("data", {matrix: matrix});

    interval = setTimeout(RunGame, gamefps * 10);
}

setTimeout(RunGame, gamefps * 10)

function changeSeason(seasonId) {
    const seasonIds = Object.keys(seasons);
    seasonIds.forEach(season => {
        if(season == seasonId){
            gameManager.setProductionRate(season);
            io.sockets.emit("season", seasonManager.giveSeasonColor(season));
        }
    });
}

function deleteEntityType(id) {
    switch (id) {
        case 1:
            grassArr.forEach(grass => {
                matrix[grass.y][grass.x] = 0;
            });
            grassArr = []
        break;
        case 2:
            herbArr.forEach(herbivore => {
                matrix[herbivore.y][herbivore.x] = 0;
            });
            herbArr = [];
        break;
        case 3:
            predArr.forEach(predator => {
                matrix[predator.y][predator.x] = 0;
            });
            predArr = [];
        break;
    }
}


function killEntity(entityId) {
    if(grassArr[0] !== undefined) if(entityId == grassArr[0].constructor.name)  deleteEntityType(1);
    if(herbArr[0] !== undefined) if(entityId == herbArr[0].constructor.name)  deleteEntityType(2);
    if(predArr[0] !== undefined) if(entityId == predArr[0].constructor.name)  deleteEntityType(3);
    if(entityId === "All") {
        MatrixCreator(MatrixSide,0,0,0,true);
        grassArr = [];
        herbArr = [];  
        predArr = [];
        stormArr = [];
        humanArr = [];
    }
}

function spawnEntity(entityId) {
    if(grassArr[0] !== undefined) if(entityId == grassArr[0].constructor.name)  MatrixCreator(MatrixSide,10,0,0,false);
    if(herbArr[0] !== undefined) if(entityId == herbArr[0].constructor.name)  MatrixCreator(MatrixSide,0,10,0,false);
    if(predArr[0] !== undefined) if(entityId == predArr[0].constructor.name)  MatrixCreator(MatrixSide,0,0,10,false);
}

function restart() {
    if (!onCooldown){
        for (let i = 0; i < MatrixSide; i++) {
            for (let j = 0; j < MatrixSide; j++) {
                matrix[i][j] = 0;
            }
        }

        grassArr = [];
        herbArr = [];
        predArr = [];
        stormArr = [];
        humanArr = [];

        entitycount = new EntityCount();

        MatrixCreator(MatrixSide, 20, 10, 5, true);
        creatingObjects();

    } else {
        setInterval(() => {onCooldown = false}, 5000);
    }
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

function writeStatistics() {
    fs.writeFile("statistics.json", JSON.stringify(entitycount.count), function () {});
}

setInterval(writeStatistics, 250 * 60);

