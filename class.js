class Grass{
    constructor(x,y){
        this.x = x;
        this.y = y;
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
        matrix[this.y][this.x] = 1;
    }

    chooseCell(ch){
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


    mul(){
        this.multiply++;

        let emptyCells = this.chooseCell(0);
        let randomCell = random(emptyCells);

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

class Predator{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.energy = 40;
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

class Storm {
    constructor(x,y,up,left){
        this.x = x;
        this.y = y;
        this.up = up;
        this.left = left;
        this.speed = 0;
        this.randm = round(random(1,3));
        this.directions = [];
    }

    updateDirection(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1],
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
            [this.x - 3, this.y + 1],
            [this.x    , this.y    ]
            ];
    }

    body(numberr){
        this.updateDirection();
        for (let i = 0; i < this.directions.length; i++){
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (x>=0 && y>=0 && x<=matrix.length - 1 && y<=matrix.length - 1) {
                matrix[y][x] = numberr;
            }
            
        }
       
    }

    kill(){
        this.updateDirection();
        for (let i = 0; i <= this.directions.length - 1; i++){
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (this.randm == 2){
                if (herbArr.length <= 10){
                    let randoom = round(random(1,30));
                    if (randoom == 2){
                        let herb = new Herbivore(this.x,this.y);
                        herbArr.push(herb);
                    }
                } else {
                    for (let i in herbArr){
                        if (x == herbArr[i].x && y == herbArr[i].y){
                            herbArr.splice(i,1);
                        }
                    }
                }
            } else if (this.randm == 3){
                for (let i in grassArr){
                    if (x == grassArr[i].x && y == grassArr[i].y){
                        grassArr.splice(i,1);
                    }
                }
            } else if (this.randm == 1){
                let randoom = round(random(1,100));
                if (randoom == 2){
                    let pred = new Predator(this.x,this.y);
                    predArr.push(pred);
                }
            }
        }
    }

    path(){
            if (this.left == 1 && this.up == 1){
                this.body(0);
                this.x++;
                this.y--;
                this.body(4);
            } else if (this.left == 1 && this.up == 0){
                this.body(0);
                this.x++;
                this.y--;
                this.body(4);
            } else if (this.left == 0 && this.up == 0){
                this.body(0);
                this.x--;
                this.y++;
                this.body(4);
            } else if (this.left == 0 && this.up == 1){
                this.body(0);
                this.x--;
                this.y--;
                this.body(4);
            }
        this.die();
    }

    die() {
        if (this.x < 0 || this.y < 0 || this.x > matrix.length - 1 || this.y > matrix.length - 1){
            this.body(0);
            for (let i in stormArr){
                if (this.x == stormArr[i].x && this.y == stormArr[i].y){
                    stormArr.splice(i,1);
                }
            }
        }

    }

    mind(){
        this.speed++;
        this.body(4);
        if(this.speed >= 1){
                this.die();
                this.kill();
                this.path();

        this.speed = 0;
        }
    }
}

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

class allStarter {
    constructor (){
        this.randm;
    }

    starterr(){
        this.randm = round(random(1,10));
        if (this.randm == 2){
            let y = round(random(0,matrix.length-1));
            let x = round(random(0,1));
            let left , up;

            if (x == 0){
                x = 0;
                left = 1;
            } else {
                x = matrix.length-1;
                left = 0;
            }

            if (y < matrix.length/2){
                up = 1;
            } else {
                up = 0;
            }

            var storm = new Storm(x,y,up,left);
            stormArr.push(storm);
        } else if (this.randm == 3){
            if (humanArr.length <= 10) {
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