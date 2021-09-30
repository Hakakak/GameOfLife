const LivingEntity = require("./LivingEntity");
const random = require("./random");

module.exports = class Grass extends LivingEntity{
    constructor(x,y){
        super(x,y);
        this.energy = 0;
        matrix[this.y][this.x] = 1;
    }

    chooseCell(ch){
        return super.chooseCell(ch);
    }


    mul(){
        this.energy++;

        let randomCell = random(this.chooseCell(0));

        if (this.energy >= 4 && randomCell) {
            
            let x = randomCell[0];
            let y = randomCell[1];
            
            matrix[y][x] = 1;
            let gr = new Grass(x,y);
            grassArr.push(gr);
            this.energy = 0;
        }
    }
        
}