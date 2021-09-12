class Herbivore{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.energy = 13;
        this.direction = [];
    }

    updateDirection(){
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(ch){
        this.updateDirection()
        var found = [];
        for(let i in this.direction){
            
            let x = this.direction[i][0];
            let y = this.direction[i][1];

            if(x >= 0 && y >= 0 && x <= matrix.length - 1 && y <= matrix.length - 1){
                
                if(matrix[y][x] == ch){
                    found.push(this.direction[i])
                }

            }
        }

        return found
    }

    move(){
        this.energy--;
        let arr = this.chooseCell(1);
        
        if(arr.length > 0)
        {
            this.eat();
            if (this.energy >= 15) {
                this.mul();
            }
        }
        else
        {
            arr = this.chooseCell(0);
            let emptyCell = random(arr);
            if (emptyCell) {
                let x = emptyCell[0];
                let y = emptyCell[1];

                matrix[y][x] = 2;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
                
                if(this.energy <= 0){
                    this.die();
                }
            }
        }

        
    }
    eat(){
        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 3;
        }
    }
    
    die(){
        matrix[this.y][this.x] = 0
            for (var i in herbArr) {
                if (this.x == herbArr[i].x && this.y == herbArr[i].y) {
                    herbArr.splice(i, 1);
                    break;
                }
            }
    }

    mul(){
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var cow = new Herbivore(newCell[0], newCell[1]);
            herbArr.push(cow);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }
    }

}