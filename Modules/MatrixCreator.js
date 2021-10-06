const Grass = require("./Grass")
const Herbivore = require("./Herbivore")
const Predator = require("./Predator")
const random = require("./random")

module.exports = function MatrixCreator(size, grassAmount, herbAmount, predAmount, clearMatrix) {
    if(clearMatrix){
        for (let i = 0; i < size; i++) {
            matrix[i] = [];
            for (let j = 0; j < size; j++){
                matrix[i][j] = 0;
            }
        }
    }
    
    for (let i = 0; i < grassAmount; i++) {
        let x = random(size - 1);
        let y = random(size - 1);
        if (matrix[y][x] == 0) grassArr.push(new Grass(x, y));
        else i--;
    }

    for (let i = 0; i < herbAmount; i++) {
        let x = random(size - 1);
        let y = random(size - 1);
        if (matrix[y][x] == 0) herbArr.push(new Herbivore(x, y));
        else i--;
    }

    for (let i = 0; i < predAmount; i++) {
        let x = random(size - 1);
        let y = random(size - 1);
        if (matrix[y][x] == 0) predArr.push(new Predator(x, y));
        else i--;
    }
}