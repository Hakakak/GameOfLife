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