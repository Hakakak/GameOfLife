const LivingEntity = require("./LivingEntity");
const random = require("./random");

module.exports = class Predator extends LivingEntity{
    constructor(x,y){
        super(x,y);
        this.energy = 40;
    }

    updateDirection(){
        return super.updateDirection();
    }

    chooseCell(ch){
        return super.chooseCell(ch);
    }

    move(){
        this.energy--;
        let arr = this.chooseCell(2);

        

        if(arr.length > 0)
        {
            this.eat();
            if (this.energy >= 50) {
                this.mul();
            }
        }
        else
        {
            let emptyCell = random(this.chooseCell(0));    
            let emptyGrass = random(this.chooseCell(1));
            if (emptyCell) {
                let x = emptyCell[0];
                let y = emptyCell[1];

                matrix[y][x] = 3;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
            } else if (emptyGrass){
                let x = emptyGrass[0];
                let y = emptyGrass[1];

                matrix[y][x] = 3;
                matrix[this.y][this.x] = 1;

                this.x = x;
                this.y = y;
            }
        }

        if(this.energy <= 0){
            this.die();
        }
    }
    eat(){
        var newCell = random(this.chooseCell(2));
        var newCell5 = random(this.chooseCell(5));

        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[y][x] = 3;

            for (var i in herbArr) {
                if (x == herbArr[i].x && y == herbArr[i].y) {
                    herbArr.splice(i, 1);
                    break;
                }
            }

            this.y = y;
            this.x = x;
            this.energy += 5;
        } else if (newCell5) {
            var x = newCell5[0];
            var y = newCell5[1];

            matrix[this.y][this.x] = 0;
            matrix[y][x] = 3;

            for (var i in humanArr) {
                if (x == humanArr[i].x && y == humanArr[i].y) {
                    humanArr.splice(i, 1);
                    break;
                }
            }

            this.y = y;
            this.x = x;
            this.energy += 5;
        }
        
    }
    
    die(){
       matrix[this.y][this.x] = 0;
            for (var i in predArr) {
                if (this.x == predArr[i].x && this.y == predArr[i].y) {
                    predArr.splice(i, 1);
                    break;
                }
            }
    }

    mul(){
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            this.energy = 38;
            var gz = new Predator(newCell[0], newCell[1]);
            predArr.push(gz);
            matrix[newCell[1]][newCell[0]] = 3;
        }
    }

}