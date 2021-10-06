const socket = io();
const seasonChangerArray = document.querySelectorAll(".change-season");
const restartButton = document.querySelector(".restart-button");
const killEntityArray = document.querySelectorAll(".kill-entity");
const spawnEntityArray = document.querySelectorAll(".spawn-entity");
const fpsbutton = document.querySelector(".FRChanger");
let isChartCreated = false;
let isCanvasCreated = false;
let Mychart;

function setup() {

    var side = 15;

    var matrix = [];
    season = {Grass: "#1A921B" ,Herbivore : "#FFE01B" ,Predator : "#F72121" ,Human: "#AB7B33"};

    socket.on("data", drawCreatures);
    socket.on("season", (data) => {
        season = data;
    })
    socket.on("chart", (data) => {
        if(!isChartCreated){
            Mychart = new Chart(document.querySelector("#countChart"), data.config);
            isChartCreated = true;
        } else {
            Mychart.data.datasets[0].data = data.data.datasets[0].data;
            Mychart.update();
        }
    })
    
    

    function drawCreatures(data) {
        matrix = data.matrix;

        if(!isCanvasCreated){
            createCanvas(matrix[0].length * side, matrix.length * side);
            document.querySelector(".canvas-div").appendChild(document.querySelector("#defaultCanvas0"))
            isCanvasCreated = true;         
        }

        background('#acacac');

        socket.emit("changeChart");

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1)      fill(season.Grass);
                else if (matrix[i][j] == 2) fill(season.Herbivore);
                else if (matrix[i][j] == 3) fill(season.Predator);
                else if (matrix[i][j] == 4) fill("grey");
                else if (matrix[i][j] == 5) fill(season.Human);
                else if (matrix[i][j] == 0) fill("#8D5524");
                rect(j * side, i * side, side, side);
            }
        }
    }
}

seasonChangerArray.forEach(seasonButton => {
    seasonButton.addEventListener("click", () => {
        socket.emit("changeSeason", seasonButton.getAttribute("value") );
    })
});

killEntityArray.forEach(killButton => {
    killButton.addEventListener("click", () => {
        socket.emit("killEntity", killButton.getAttribute("value"));
    })
});

spawnEntityArray.forEach(spawnButton => {
    spawnButton.addEventListener("click", () => {
        socket.emit("spawnEntity", spawnButton.getAttribute("value"));
    })
});

restartButton.addEventListener("click", () => {
    socket.emit("restart");
})

fpsbutton.addEventListener("change", () => {
    socket.emit("fpsChange", fpsbutton.value);
})