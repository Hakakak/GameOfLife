const socket = io();
let seasonChangerArray = document.querySelectorAll(".change-season");
let i = 0;
let Mychart;

function setup() {

    var side = 30;

    var matrix = [];
    var season = {Grass: "#1A921B" ,Herbivore : "#FFE01B" ,Predator : "#F72121" ,Human: "#AB7B33"};

    socket.on("data", drawCreatures);
    socket.on("season", (data) => {
        season = data;
    })
    socket.on("chart", (data) => {
        if(i == 0){
            i++;
            Mychart = new Chart(document.querySelector("#countChart"), {
                type:"bar",
                data: data.data,
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
                    plugins: [plugin = {
                        id: 'custom_canvas_background_color',
                        beforeDraw: (chart) => {
                          const ctx = chart.canvas.getContext('2d');
                          ctx.save();
                          ctx.globalCompositeOperation = 'destination-over';
                          ctx.fillStyle = 'white';
                          ctx.fillRect(0, 0, chart.width, chart.height);
                          ctx.restore();
                        }
                      }]
                });
        } else {
            Mychart.data.datasets[0].data = data.data.datasets[0].data;
            Mychart.update();
        }
    })
    
    

    function drawCreatures(data) {
        matrix = data.matrix;

        createCanvas(matrix[0].length * side, matrix.length * side)
        background('#acacac');

        socket.emit("changeChart")

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