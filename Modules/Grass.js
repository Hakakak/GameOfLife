const LivingEntity = require("./LivingEntity");
const random = require("./random");

module.exports = class Grass extends LivingEntity{
    constructor(x,y){
        super(x,y);
        this.multiply = 0;
    }


    mul(){
        this.multiply++;

        matrix[this.y][this.x] = 1;

        let randomCell = random(this.chooseCell(0));

        if (this.multiply >= 4 && randomCell) { 
            
            let x = randomCell[0];
            let y = randomCell[1];
            
            matrix[y][x] = 1;
            let gr = new Grass(x,y);
            grassArr.push(gr);
            this.multiply = 0;
        }
    }
        
}