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