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