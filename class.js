class Grass{
    constructor(x,y){
        this.x = x
        this.y = y 
        this.multiply = 0;
        this.direction = [

            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ]
        matrix[y][x] = 1
    }

    chooseCell(ch){
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


    mul(){
        this.multiply++

        let emptyCells = this.chooseCell(0)
        let randomCell = random(emptyCells)

        if (this.multiply >= 4 && randomCell) {
            
            let x = randomCell[0]
            let y = randomCell[1]

            matrix[y][x] = 1
            let gr = new Grass(x,y)
            grassArr.push(gr)
            this.multiply = 0
        }
    }
        
}

class Xotaker{
    constructor(x,y){
        this.x = x
        this.y = y
        this.energy = 13
        this.direction = []
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
        ]
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
        this.energy--

        if (this.energy >= 15) {
            this.mul()
        }

        let arr = this.chooseCell(1)
        if(arr.length > 0)
        {
            this.eat()
        }
        else
        {
            arr = this.chooseCell(0)
            let emptyCell = random(arr)

            if (emptyCell) {
                let x = emptyCell[0]
                let y = emptyCell[1]

                matrix[y][x] = 2
                matrix[this.y][this.x] = 0

                this.x = x
                this.y = y
            }
        }

        if(this.energy <= 0){
            this.die()
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
            this.energy += 2;
        }
    }
    
    die(){
        matrix[this.y][this.x] = 0
            for (var i in xotakerArr) {
                if (this.x == xotakerArr[i].x && this.y == xotakerArr[i].y) {
                    xotakerArr.splice(i, 1)
                    break;
                }
            }
    }

    mul(){
        var newCell = random(this.chooseCell(0));

        if (this.energy >= 15 && newCell) {
            var newGrassEater = new Xotaker(newCell[0], newCell[1]);
            xotakerArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }
    }

}


class Bomber{
    constructor(x,y){
        this.x = x
        this.y = y
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(ch){
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

    RandomXotaker(){
        let x = Math.round(random(0,matrix.length - 1))
        let y = Math.round(random(0,matrix.length - 1))


        for (let i in xotakerArr){
            matrix[xotakerArr[i].x][xotakerArr[i].y] = 0
            xotakerArr.splice(i,1);
            break
        }

        matrix[y][x] = 2;
        
        let newobject = new Xotaker(x,y)
        xotakerArr.push(newobject)
    }

    checker(){
        let xotaker = random(this.chooseCell(2))

        if (xotaker) {
            let newx = xotaker[0]
            let newy = xotaker[1]

            matrix[newy][newx] = 0;
            matrix[this.y][this.x] = 0;



            this.RandomXotaker()
            this.RandomXotaker()

            for (let i in BomberArr){
                if (this.x == BomberArr[i].x && this.y == BomberArr[i].y) {
                    BomberArr.splice(i, 1)
                    break;
                }
            }
        }
    }
}

class Predator{
    constructor(x,y){
        this.x = x
        this.y = y
        this.energy = 40
        this.direction = []
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
        ]
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
        this.energy--
        let arr = this.chooseCell(2)
        if(arr.length > 0)
        {
            this.eat()
            if (this.energy >= 50) {
                this.mul()
            }
        }
        else
        {
            arr = this.chooseCell(0)
            let emptyCell = random(arr)
            let emptyCell2 = random(this.chooseCell(1))
            if (emptyCell) {
                let x = emptyCell[0]
                let y = emptyCell[1]

                matrix[y][x] = 3
                matrix[this.y][this.x] = 0



                this.x = x
                this.y = y
            } else if (emptyCell2){
                let x = emptyCell2[0]
                let y = emptyCell2[1]

                matrix[y][x] = 3
                matrix[this.y][this.x] = 1



                this.x = x
                this.y = y
            }

            if(this.energy <= 0){
                this.die()
            }
        }

        

        
    }
    eat(){
        var newCell = random(this.chooseCell(2));
        var newCell2 = random(this.chooseCell(3));

        
        if(predatorArr.length >= 60 && newCell2){
            var newX = newCell2[0];
            var newY = newCell2[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
        } else {
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 3;

                for (var i in xotakerArr) {
                    if (newX == xotakerArr[i].x && newY == xotakerArr[i].y) {
                        xotakerArr.splice(i, 1);
                        break;
                    }
                }

                this.y = newY;
                this.x = newX;
                this.energy += 5;
            }
        }
    }
    
    die(){
        matrix[this.y][this.x] = 0
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break;
                }
            }
    }

    mul(){
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newPredator = new Predator(newCell[0], newCell[1]);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 35;
        }
    }

}

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

class allStarter {  
    constructor (){
        this.randm;
    }

    starterr(){
        this.randm = round(random(1,15));
       
        if (this.randm == 3 || this.randm == 4){
            if (humanArr.length <= 20) {
                let x = round(random(0,matrix.length-1));
                let y = round(random(0,1));

                if (y == 0){
                    y = 0;
                } else {
                    y = matrix.length-1;
                }

                var hum = new Human(x,y);
                humanArr.push(hum); 
            }
        }
    }
}