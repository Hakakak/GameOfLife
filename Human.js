class Human{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.energy = 30;
        this.strength = random(round(0,5));
        this.direction = [];
    }

    updateDirection(){
        this.direction = [
            [this.x    , this.y + 2],
            [this.x    , this.y - 2],
            [this.x + 2, this.y    ],
            [this.x - 2, this.y    ],
            [this.x + 1, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y + 1],
            [this.x + 1, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y - 3],
            [this.x    , this.y - 3],
            [this.x + 1, this.y - 3],
            [this.x - 1, this.y + 3],
            [this.x    , this.y + 3],
            [this.x + 1, this.y + 3],
            [this.x + 3, this.y - 1],
            [this.x + 3, this.y    ],
            [this.x + 3, this.y + 1],
            [this.x - 3, this.y - 1],
            [this.x - 3, this.y    ],
            [this.x - 3, this.y + 1]
        ];
    }

    chooseCell(ch){
        this.updateDirection();
        var found = [];
        for(let i in this.direction){
            
            let x = this.direction[i][0];
            let y = this.direction[i][1];

            if(x >= 0 && y >= 0 && x <= matrix.length - 1 && y <= matrix.length - 1){
                
                if(matrix[y][x] == ch){
                    found.push(this.direction[i]);
                }

            }
        }

        return found;
    }

    move(){
        this.energy--;
        
        let arr2 = this.chooseCell(2);
        let arr3 = this.chooseCell(3);
        if(arr2.length > 0 || arr3.length > 0)
        {
            this.kill();
        }
        else
        {
            let emptyCell = random(this.chooseCell(0));
            let emptyGrass = random(this.chooseCell(1));
            if (emptyGrass) {
                let x = emptyGrass[0];
                let y = emptyGrass[1];

                matrix[y][x] = 5;
                matrix[this.y][this.x] = 1;

                this.x = x;
                this.y = y;

                if(this.energy <= 0){
                    this.die();
                }
            } else if (emptyCell) {
                let x = emptyCell[0];
                let y = emptyCell[1];

                matrix[y][x] = 5;
                matrix[this.y][this.x] = 0;

                this.energy++;

                this.x = x;
                this.y = y;
                
                if(this.energy <= 0){
                    this.die();
                }
            } 
        }

        
    }
    kill (){
        var enemy2 = random(this.chooseCell(2));
        var enemy3 = random(this.chooseCell(3));
        var enemy5 = random(this.chooseCell(5));


        if (enemy3) {
            for (let i = 0 ; i < this.strength ; i++){
                var x = enemy3[0];
                var y = enemy3[1];

                matrix[y][x] = 0;

                for (let i in predArr) {
                    if (x == predArr[i].x && y == predArr[i].y) {
                        predArr.splice(i, 1);
                        break;
                    }
                }
            } 
        }
        if (enemy2) {
            for (let i = 0; i < this.strength ; i++){
                var x = enemy2[0];
                var y = enemy2[1];

                matrix[y][x] = 0;

                for (let i in herbArr) {
                    if (x == herbArr[i].x && y == herbArr[i].y) {
                        herbArr.splice(i, 1);
                        break;
                    }
                }
            }
            
        }
        if (enemy5) {
            var x = enemy5[0];
            var y = enemy5[1];

            matrix[y][x] = 0;

            for (let i in humanArr) {
                if (x == humanArr[i].x && y == humanArr[i].y) {
                    if (humanArr[i].strength < this.strength){
                        humanArr.splice(i, 1);
                        break;
                    } else {
                        for (let i in humanArr) {
                            if (this.x == humanArr[i].x && this.y == humanArr[i].y) {
                                humanArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    
    die (){
        matrix[this.y][this.x] = 0
            for (var i in humanArr) {
                if (this.x == humanArr[i].x && this.y == humanArr[i].y) {
                    humanArr.splice(i, 1);
                    break;
                }
            }
    }

}