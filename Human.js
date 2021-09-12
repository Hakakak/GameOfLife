class Human{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.energy = 30;
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

        matrix[this.y][this.x] = 5;
        
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

                this.x = x;
                this.y = y;
                
                if(this.energy <= 0){
                    this.die();
                }
            } 
        }

        
    }
    kill (){
        this.updateDirection();
        var enemy2 = random(this.chooseCell(2));
        var enemy3 = random(this.chooseCell(3));

        if (enemy3) {
            for (let i = 0 ; i < this.direction.length ; i++){
                var x = enemy3[0];
                var y = enemy3[1];

                matrix[y][x] = 0;

                for (let i in predatorArr) {
                    if (x == predatorArr[i].x && y == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }

                let herb = new Xotaker(x,y);
                xotakerArr.push(herb);


            } 
        }
        if (enemy2) {
            for (let i = 0; i < this.direction.length ; i++){
                var x = enemy2[0];
                var y = enemy2[1];

                matrix[y][x] = 0;

                for (let i in xotakerArr) {
                    if (x == xotakerArr[i].x && y == xotakerArr[i].y) {
                        xotakerArr.splice(i, 1);
                        break;
                    }
                }

                let pred = new Predator(this.x,this.y);
                predatorArr.push(pred);

                for (let i in humanArr) {
                    if (this.x == humanArr[i].x && this.y == humanArr[i].y){
                        humanArr.splice(i,1);
                        break;
                    }
                }

                matrix[this.y][this.x] = 0;
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